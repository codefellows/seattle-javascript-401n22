import { useDispatch, useSelector } from "react-redux";
import gameSlice from "../../store/game";
import { useEffect } from "react";
import campaignSlice from "../../store/campaign";

const Game = () => {
  const game = useSelector((state) => {
    return state.game;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (game.done) {
      dispatch(campaignSlice.actions.recordGame({ game }));
    }
  }, [dispatch, game]);

  const rock = () => {
    dispatch(gameSlice.actions.shoot({ shot: "rock" }));
  };
  const paper = () => {
    dispatch(gameSlice.actions.shoot({ shot: "paper" }));
  };
  const scissors = () => {
    dispatch(gameSlice.actions.shoot({ shot: "scissors" }));
  };

  const playAgain = () => {
    dispatch(gameSlice.actions.resetGame());
  };

  return (
    <article>
      <main>
        <dl>
          <dt>Player Throw</dt>
          <dd>{game.playerThrow}</dd>
          <dt>Computer Throw</dt>
          <dd>{game.computerThrow}</dd>
          <dt>Shots</dt>
          <dd>{game.shots}</dd>
          <dt>Player Wins</dt>
          <dd>{game.playerWin}</dd>
          <dt>Computer Wins</dt>
          <dd>{game.computerWin}</dd>
        </dl>
        {game.done ? (
          <p>
            {"Done - "}
            {game.playerWin > game.computerWin
              ? "Player won!"
              : "Computer won!"}
            <br />
            <button onClick={playAgain}>Play again?</button>
          </p>
        ) : (
          <p>
            <button onClick={rock}>🪨</button>
            &nbsp;
            <button onClick={paper}>📰</button>
            &nbsp;
            <button onClick={scissors}>✂️</button>
          </p>
        )}
      </main>
    </article>
  );
};

export default Game;
