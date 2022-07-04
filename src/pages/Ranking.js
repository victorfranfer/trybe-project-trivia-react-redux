import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetAction } from '../redux/actions';
import './Ranking.css';

class Ranking extends React.Component {
  sairDoJogo = () => {
    const { history, resetGame } = this.props;
    resetGame();
    history.push('/');
  };

  getRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return ranking || [];
  }

  sortedRanking = () => {
    const ranking = this.getRanking();
    ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }

  render() {
    const ranking = this.sortedRanking();

    return (
      <div className="leaderboard">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.sairDoJogo() }
        >
          Play Again
        </button>
        <ol className="ranking-ol">
          { ranking.map((player, index) => (
            <li key={ index } className="player-ranking">
              <img src={ player.picture } alt={ player.name } />
              <span className="ranking-name" data-testid={ `player-name-${index}` }>
                { player.name }
              </span>
              <span className="ranking-score" data-testid={ `player-score-${index}` }>
                { player.score }
              </span>
            </li>
          )) }
        </ol>
      </div>
    );
  }
}

Ranking.propTypes = {
  resetGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
