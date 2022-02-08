import { useGameMachine } from '../Machines/gameMachine';
import '../Styles/Styles.css';

/** Représente un écrans de pause
 * @returns Un composent de Pause
 */
export const Pause = (() => {
    const [current, send] = useGameMachine();

    return (
        <>
            <div className='pauseGameBackground' />
            <div align="center" className='pauseGame'>
                <h1 className="titre">Pause</h1>
                <p className="textGameOver">Level: {current.context.level + 1}</p>
                <p className="textGameOver">Temps: {current.context.time} millisecondes</p>
                <button onClick={(() => { send("return"); })}>Retour</button>
                <button onClick={(() => { send("quit"); })}>Quitter</button>
            </div>
        </>
    );
});