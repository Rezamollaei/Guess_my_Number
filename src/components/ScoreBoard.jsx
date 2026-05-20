function ScoreBoard({ score, highscore }) {
  return (
    <section className="panel stats-panel">
      <div className={`stat-card score-card ${score <= 5 ? "danger" : ""}`.trim()}>
        <p className="stat-label">Score</p>
        <p className="score">{score}</p>
      </div>
      <div className="stat-card highscore-card">
        <p className="stat-label">High score</p>
        <p className="highscore">{highscore}</p>
      </div>
      <div className="stat-card hint-card">
        <p className="stat-label">Hints</p>
        <p className="stat-info">Warm coral means too high. Cool blue means too low.</p>
      </div>
    </section>
  );
}

export default ScoreBoard;
