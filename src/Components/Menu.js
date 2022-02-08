import { useGameMachine } from '../Machines/gameMachine';
import '../Styles/Styles.css';

/** Represente un écrans de menu
 * 
 * @returns Un composent de menu
 */
export const Menu = (() => {
    const [current, send] = useGameMachine();

    // Permet de commencer quand on clique sur la touche Enter
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.code === "Enter") {
            if (document.getElementById("pseudo").value !== "") {
                current.context.username = document.getElementById("pseudo").value;
                send("game");
            } else {
                document.getElementById("error").innerHTML = "Veuillez entrer un Pseudo";
            }
        }
    };

    return (
        <div align="center" className='gameMenu'>
            <h1 className="titre">The Jar</h1>

            <img src="logo.png" className='logoMenu' alt='logo' />
            <p id="error" className="error" />

            <input placeholder='Votre pseudo' id="pseudo" className="pseudoInput"></input>
            <br /><br />

            <button className="btn" onClick={(() => {
                // Vérifie si il y as un pseudo
                if (document.getElementById("pseudo").value !== "") {
                    current.context.username = document.getElementById("pseudo").value;
                    send("game");
                } else {
                    document.getElementById("error").innerHTML = "Veuillez entrer un Pseudo";
                }
            })}>Start</button>
        </div>
    );
});