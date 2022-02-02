import { Point } from "./Point";

export default function Points () {

    let points= [];

    // Ajoute 400 points a des position au hasard entre 100 et -100
    for (var i = 0; i < 400; ++i){
        points.push(<Point position={[Math.random() * (100 - -100) + -100, 4, Math.random() * (100 - -100) + -100]} key={i}/>);
    }

    // Pas l'idéale car les item n'on pas de clés uniques
    return<>{points.map((points, index)=>{return <group key={index}>{points}</group>})}</>;
}