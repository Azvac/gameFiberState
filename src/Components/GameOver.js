import { useGameMachine } from '../Machines/gameMachine';
import '../Styles/Styles.css';

/** Représente un écrans de fin de jeux
 * 
 * @returns Un composant de GameOver
 */
export const GameOver = (() => {

    // Récupérer la machine de state
    const [current, send] = useGameMachine();

    return (
        <div align="center" className='gameMenu'>
            <h1 className='titre'>GAME OVER</h1>
            <p className="textGameOver">{current.context.username}</p>
            <p className="textGameOver">Temps: {current.context.time} millisecondes</p>
            <br />
            <button className='btnGameOver' onClick={(() => send("restart"))}>Restart</button>
            <button className='btnGameOver' onClick={(() => send("menu"))}>Menu</button>
        </div>
    )
});