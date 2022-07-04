import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import './Feedback.css';

class Feedback extends React.Component {
  componentDidMount = () => {
    const { name, score, gravatarEmail } = this.props;

    const gravatar = md5(gravatarEmail).toString();

    const gravatarURL = `https://www.gravatar.com/avatar/${gravatar}`;

    this.updateRanking({
      name,
      score,
      picture: gravatarURL,
    });
  }

  updateRanking = (playerRanking) => {
    const prevRanking = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = prevRanking ? [...prevRanking, playerRanking] : [playerRanking];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  requestLoginPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  requestRankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertions } = this.props;
    const answerThreshold = 3;
    return (
      <main className="Feedback-container">
        <Header />
        <h3 data-testid="feedback-text">
          { assertions < answerThreshold ? 'Could be better...' : 'Well Done!' }
        </h3>
        <div data-testid="feedback-total-score">
          { `Total score: ${score}` }
        </div>
        <div data-testid="feedback-total-question">
          { `Total assertions: ${assertions}` }
        </div>
        <button
          type="button"
          className="feedback-btn"
          data-testid="btn-play-again"
          onClick={ () => this.requestLoginPage() }
        >
          Play Again
        </button>
        <button
          type="button"
          className="feedback-btn"
          data-testid="btn-ranking"
          onClick={ () => this.requestRankingPage() }
        >
          Ranking
        </button>
      </main>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
