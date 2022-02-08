import { useGameMachine } from '../Machines/gameMachine';
import '../Styles/Styles.css';

/** Représente un écrant de niveau suivant
 * 
 * @returns Un composant de NextLevel
 */
export const LevelComplete = (() => {

    // Récupérer la machine de state
    const [current, send] = useGameMachine();

    return (
        <div align="center" className='gameMenu'>
            <h1 className='titre'>LEVEL COMPLETE</h1>
            <p className="textGameOver">{current.context.username}</p>
            <p className="textGameOver">Temps: {current.context.time} millisecondes</p>
            <br />
            <button className='btnGameOver' onClick={(() => send("next"))}>Suivant</button>
            <button className='btnGameOver' onClick={(() => send("quit"))}>Quitter</button>
        </div>
    )
});