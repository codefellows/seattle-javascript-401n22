import { useSelector } from "react-redux";

const Campaign = () => {
  const campaign = useSelector((state) => state.campaign);

  return (
    <article>
      <main>
        <dl>
          <dt>Total games</dt>
          <dd>{campaign.totalGamesPlayed}</dd>
          <dt>Player won</dt>
          <dd>{campaign.playerGamesWon}</dd>
        </dl>
      </main>
    </article>
  );
};

export default Campaign;
