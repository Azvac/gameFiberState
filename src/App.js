import { useGameMachine } from './Machines/gameMachine';
import './Styles/Styles.css';

export default function App() {
  // Récupère la machine
  const [current] = useGameMachine();
  return (<>{current.context.gamePause} {current.context.component}</>);
}