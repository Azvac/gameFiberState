import { Point } from "./Point";
import { NB_POINTS_MAX } from "../constantes";

/** Crée touts les points sur la map
 * 
 * @returns Une liste de tout les points
 */
export const Points = ((props) => {
    const color = props.color;
    let points = [];

    // Ajoute les points a des positions au hasard dans la région alloué
    for (var i = 0; i < NB_POINTS_MAX; ++i) {
        points.push(<Point key={i} color={color} />);
    }

    return <>{points.map((points, index) => { return <group key={index}>{points}</group> })}</>;
});