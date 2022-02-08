import React from "react";
import { usePlane } from '@react-three/cannon';

/** Représente le sol
 * 
 * @returns Un composant de sol
 */
export const Ground = ((props) =>{
  const [ref] = usePlane(()=> ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0]
  }));

  return(
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[500, 500]}/>
      <meshLambertMaterial attach="material" color={props.color} />
    </mesh>
  );
});