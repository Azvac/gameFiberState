import React, { useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useBox } from '@react-three/cannon';
import { useGameMachine } from '../Machines/gameMachine';
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { Vector3 } from "three";
import { SPEED } from "../constantes";

/** Represente un joueur
 * @param {*} props 
 * @returns Un composent de joueur
 */
export const Player = (props) => {
    const [current] = useGameMachine();

    // Pour les mouvement (détection des touches)
    const {
        moveForward,
        moveBackward,
        moveLeft,
        moveRight
    } = useKeyboardControls();

    // Utilisation des texture et création de l'objet
    const materials = useLoader(MTLLoader, "Pot.mtl");
    const { camera } = useThree();
    const [ref, api] = useBox(() => ({
        args: [4, 4, 4],
        mass: 0,
        type: "Dynamic",
        ...props
    }));

    // Modèle 3D
    const obj = useLoader(OBJLoader, "Pot.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    // Vélocité
    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    // Position
    const poss = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => (poss.current = p));
    }, [api.position]);

    useFrame(() => {
        // Pour les déplacement
        const direction = new Vector3();
        const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

        camera.lookAt(poss.current[0], poss.current[1], poss.current[2]);

        // Si on est emn pause on bloque les mouvements
        if (current.matches("game.normal")) {

            direction
                .subVectors(frontVector, sideVector)
                .normalize()
                .multiplyScalar(SPEED)
                .applyEuler(camera.rotation);

            api.velocity.set(direction.x, 0, direction.z);
        }

        camera.position.lerp(new Vector3(poss.current[0] + 20, poss.current[1] + 5, poss.current[2]), 0.09);
        camera.updateProjectionMatrix();
    });

    return (
        <mesh ref={ref}>
            <primitive object={obj} scale={0.2} />
        </mesh>
    );
}