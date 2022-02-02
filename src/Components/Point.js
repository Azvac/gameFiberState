import React from 'react';
import { useBox } from '@react-three/cannon';

export const Point = ((props) => {

  const [ref, api] = useBox(() => ({
    args: [1,1,1],
    mass: 0,
    type: "Static",
    onCollideBegin: e => {
      // Détruit le composant quant toucher
      ref.current.parent.remove(ref.current);
    },
    ...props
}));
        return (
          <mesh ref={ref}>
            <boxBufferGeometry attach="geometry" args={[1, 1]}/>
            <meshLambertMaterial attach="material" color="red" />
          </mesh>
        )
});