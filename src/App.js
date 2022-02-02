import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Physics} from '@react-three/cannon';
import { Sky } from "@react-three/drei";
import { Ground } from "./Components/Ground";
import { Player } from "./Components/Player";
import Points from "./Components/Points";
import './Styles.css';

export default function App(){
  return (
    <Canvas>
      <Sky />
      <Suspense fallback={null}>
          <OrbitControls /> 
          <ambientLight intensity={0.5} />
          <Physics>
            <Player position={[0, 3, 10]}/>
            <Points />
            <Ground />
          </Physics>
        </Suspense>
    </Canvas>
  );
}