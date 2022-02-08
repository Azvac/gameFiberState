import { useGameMachine } from '../Machines/gameMachine';
import { OrbitControls } from "@react-three/drei";
import { Physics } from '@react-three/cannon';
import { Canvas, context } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Sky } from "@react-three/drei";
import { Ground } from "./Ground";
import { Player } from "./Player";
import { Points } from "./Points";

/** Représente le jeux
 * 
 * @param {pointsToWin} props Le nombre de point requis pour passer le niveaux
 * @returns Un composant de jeux
 */
export const Game = ((props) => {

  /** Récupérer la machine de state **/
  const [current, send] = useGameMachine();

  /** Nb de point pour ganger minimum */
  const pointsToWin = props.pointsToWin;
  const colorGround = props.colorGround;
  const colorPoints = props.colorPoints;

  var bestScore;

  // Permet de mettre la pause avec le bouton Escape
  document.onkeydown = function (e) {
    e = e || window.event;
    if (e.code === "Escape" && !current.context.gameOver) {
      if (current.matches("game.normal")) {
        send("pause");
      } else {
        send("return");
      }
    }
  };

  // Permet de savoir quand le niveaux est terminé
  useEffect(() => {
    if (current.context.points >= pointsToWin) {
      if (current.context.level < 5) {
        send("nextLevel");
      } else {
        send("gameOver");
      }
    }
  });

  if (current.context.bestScore !== 0) {
    bestScore = current.context.bestScore;
  } else {
    bestScore = "-";
  }

  return (
    <>
      <div className="ui">
        <span>{current.context.username}</span>
        <br />
        <span>Points: {current.context.points} / {pointsToWin}</span>
        <br />
        <span>Level: {current.context.level + 1} </span>
        <br />
        <span>Best Score: {bestScore} ms</span>
      </div>
      <Canvas>
        <Sky distance={450000} azimuth={0.8} />
        <Suspense fallback={null}>
          <OrbitControls />
          <spotLight intensity={0.6} position={[300, 300, 2000]} />
          <ambientLight intensity={0.2} />
          <Physics>
            <Player position={[0, 3, 10]} />
            <Points color={colorPoints} />
            <Ground color={colorGround} />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
});