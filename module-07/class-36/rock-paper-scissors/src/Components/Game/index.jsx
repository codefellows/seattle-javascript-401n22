import { useDispatch, useSelector } from "react-redux";
import gameSlice from "../../store/game";

const Game = () => {
  const game = useSelector((state) => {
    return state.game;
  });

  const dispatch = useDispatch();

  const rock = () => {
    dispatch(gameSlice.actions.shoot({ shot: "rock" }));
  };
  const paper = () => {
    dispatch(gameSlice.actions.shoot({ shot: "paper" }));
  };
  const scissors = () => {
    dispatch(gameSlice.actions.shoot({ shot: "scissors" }));
  };

  return (
    <main>
      <ul>
        <li>Player Throw: {game.playerThrow}</li>
        <li>Computer Throw: {game.computerThrow}</li>
        <li>Shots: {game.shots}</li>
        <li>Player Wins: {game.playerWin}</li>
        <li>Computer Wins: {game.computerWin}</li>
        <li>Done: {game.done ? "True" : "False"}</li>
      </ul>
      <div className="flex flex-row">
        <button onClick={rock}>🪨</button>
        <button onClick={paper}>📰</button>
        <button onClick={scissors}>✂️</button>
      </div>
    </main>
  );
};

export default Game;
