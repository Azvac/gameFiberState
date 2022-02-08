import { useGameMachine } from '../Machines/gameMachine';
import React from 'react';
import { useBox } from '@react-three/cannon';
import { LIMIT_SIZE_POINTS } from '../constantes';

/** Represente un point
 * 
 * @param {*} props 
 * @returns Un composent de point
 */
export const Point = ((props) => {
  const color = props.color;

  // Récupérer la machine de state
  const [current, send] = useGameMachine();
  let actif = true;

  const [ref] = useBox(() => ({
    args: [1, 1, 1],
    mass: 0,
    type: "Static",
    onCollideBegin: e => {
      if (actif) {
        // Détruit le composant quant toucher
        ref.current.parent.remove(ref.current);
        actif = false;

        // Augmente les points
        send("point");
      }
    },
    // Définit une position au hasard sur la map
    position: [Math.random() * (LIMIT_SIZE_POINTS - -LIMIT_SIZE_POINTS) + -LIMIT_SIZE_POINTS, 4, Math.random() * (LIMIT_SIZE_POINTS - -LIMIT_SIZE_POINTS) + -LIMIT_SIZE_POINTS]
  }));
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[1, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
});