import { useActor } from '@xstate/react';
import { createMachine, assign, interpret } from 'xstate';
import { Game } from "../Components/Game";
import { Loading } from "../Components/Loading";
import { Menu } from "../Components/Menu";
import { GameOver } from "../Components/GameOver";
import { Pause } from "../Components/Pause";
import { LevelComplete } from '../Components/LevelComplete';
import { COLOR_GROUND, COLOR_POINTS, DEFAULT_POINTS_TO_WIN, POINT_PER_LVL } from '../constantes';

/** Machine Pour la gestion de l'application
 * 
 * @Component L'affichage principale (Loading, Menu, Game, GameOver)
 * @gamePause L'affichage de la pause (Pause)
 * @username Le nom de l'utilisateur
 * @points Le nombre de points de l'utilisateur
 * @startTime Utilisé pour calculer le temps de l'utilisateur
 * @time Le temps présent de l'utilisateur depuit le début de la parti
 */
export const gameMachine = createMachine({
    initial: 'loading',
    id: 'gameMachine',
    context: {
        component: (<Loading />),
        gamePause: (<></>),
        gameOver: false,
        pointsToWin: DEFAULT_POINTS_TO_WIN,
        bestScore: 0,
        startTime: 0,
        username: "",
        points: 0,
        level: 0,
        time: 0
    },
    states: {
        // State de Chargement
        loading: {
            // Ouvre le Menu
            after: {
                2000: {
                    target: "menu",
                    actions: assign({ component: (context) => <Menu /> })
                }
            }
        },
        // State de Menu
        menu: {
            id: "menuId",
            on: {
                game: {
                    // Démare le Jeu
                    target: "game",
                    actions: [
                        assign({
                            component: (context) => <Game
                                pointsToWin={context.pointsToWin}
                                colorGround={COLOR_GROUND[context.level]}
                                colorPoints={COLOR_POINTS[context.level]} />
                        }),
                        assign({ startTime: (context) => new Date().getTime() })
                    ]
                }
            }
        },
        // State de Jeu
        game: {
            initial: 'normal',
            id: "gameId",
            states: {
                // Sous-State de jeu Normale
                normal: {
                    on: {
                        pause: {
                            // Met le jeu en Pause
                            target: "pause",
                            actions: [
                                assign({ gamePause: (context) => <Pause /> }),
                                (context) => { context.time += (new Date().getTime() - context.startTime); }
                            ]
                        },
                        // Augment le nombre de Point de 1
                        point: { actions: assign({ points: (context) => context.points + 1 }) },
                        // Quand on termine un niveaux
                        nextLevel: {
                            target: "levelCompleted",
                            actions: [
                                assign({ time: (context) => context.time + (new Date().getTime() - context.startTime) }),
                                assign({ pointsToWin: (context) => context.pointsToWin + POINT_PER_LVL }),
                                assign({ level: (context) => context.level + 1 }),
                                assign({ component: (context) => <LevelComplete /> }),
                                assign({ startTime: (context) => new Date().getTime() }),
                                assign({ points: (context) => 0 })
                            ]
                        },
                        // Quand la partie est terminer
                        gameOver: {
                            target: "gameOver",
                            actions: [
                                assign({ gameOver: (context) => true }),
                                assign({ time: (context) => context.time + (new Date().getTime() - context.startTime) }),
                                (context) => {
                                    if (context.time < context.bestScore || context.bestScore === 0) {
                                        context.bestScore = context.time;
                                    }
                                },
                                assign({ component: (context) => <GameOver /> }),
                            ]
                        }
                    }
                },
                // Sous-State de jeu en Pause
                pause: {
                    on: {
                        // Arrete la Pause
                        return: {
                            target: "normal",
                            actions: [
                                assign({ gamePause: (context) => <></> }),
                                (context) => { context.startTime = new Date().getTime(); }
                            ]
                        },
                        // Retour au Menu
                        quit: {
                            target: '#menuId',
                            actions: [
                                assign({ component: (context) => <Menu /> }),
                                assign({ username: (context) => "" }),
                                assign({ startTime: (context) => 0 }),
                                assign({ time: (context) => 0 }),
                                assign({ points: (context) => 0 }),
                                assign({ level: (context) => 0 }),
                                assign({ pointsToWin: (context) => DEFAULT_POINTS_TO_WIN }),
                                assign({ component: (context) => <Menu /> }),
                                assign({ gamePause: (context) => <></> }),
                                assign({ gameOver: (context) => false }),
                                assign({ bestScore: (context) => 0 })
                            ]
                        }
                    }
                },
                // State quand la partie est terminer
                gameOver: {
                    on: {
                        // Recomence une Partie
                        restart: {
                            target: "#gameId",
                            actions: [
                                assign({ pointsToWin: (context) => DEFAULT_POINTS_TO_WIN }),
                                assign({ level: (context) => 0 }),
                                assign({
                                    component: (context) => <Game
                                        pointsToWin={context.pointsToWin}
                                        colorGround={COLOR_GROUND[context.level]}
                                        colorPoints={COLOR_POINTS[context.level]} />
                                }),
                                assign({ startTime: (context) => new Date().getTime() }),
                                assign({ time: (context) => 0 }),
                                assign({ points: (context) => 0 }),
                                assign({ gameOver: (context) => false })
                            ]
                        },
                        // Retourne au Menu
                        menu: {
                            target: "#menuId",
                            actions: [
                                assign({ component: (context) => <Menu /> }),
                                assign({ username: (context) => "" }),
                                assign({ startTime: (context) => 0 }),
                                assign({ time: (context) => 0 }),
                                assign({ points: (context) => 0 }),
                                assign({ level: (context) => 0 }),
                                assign({ pointsToWin: (context) => DEFAULT_POINTS_TO_WIN }),
                                assign({ component: (context) => <Menu /> }),
                                assign({ gamePause: (context) => <></> }),
                                assign({ gameOver: (context) => false }),
                                assign({ bestScore: (context) => 0 })
                            ]
                        }
                    }
                },
                // State quand un level est terminer
                levelCompleted: {
                    on: {
                        next: {
                            target: "#gameId",
                            actions: [
                                assign({
                                    component: (context) => <Game
                                        pointsToWin={context.pointsToWin}
                                        colorGround={COLOR_GROUND[context.level]}
                                        colorPoints={COLOR_POINTS[context.level]} />
                                })
                            ]
                        },
                        quit: {
                            target: "#menuId",
                            actions: [
                                assign({ component: (context) => <Menu /> }),
                                assign({ username: (context) => "" }),
                                assign({ startTime: (context) => 0 }),
                                assign({ time: (context) => 0 }),
                                assign({ points: (context) => 0 }),
                                assign({ level: (context) => 0 }),
                                assign({ pointsToWin: (context) => DEFAULT_POINTS_TO_WIN }),
                                assign({ component: (context) => <Menu /> }),
                                assign({ gamePause: (context) => <></> }),
                                assign({ gameOver: (context) => false }),
                                assign({ bestScore: (context) => 0 })
                            ]
                        }
                    }
                }
            }
        }
    }
});

const service = interpret(gameMachine).start();

export const useGameMachine = () => {
    return useActor(service);
};