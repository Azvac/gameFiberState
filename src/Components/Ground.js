import React from "react";
import { usePlane } from '@react-three/cannon';

export const Ground = (() =>{
  const [ref] = usePlane(()=> ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0]
  }));

  return(
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[500, 500]}/>
      <meshLambertMaterial attach="material" color="lightGreen" />
    </mesh>
  );
});