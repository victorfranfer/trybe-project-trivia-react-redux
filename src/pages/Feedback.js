import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
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
    console.log(assertions);
    const answerThreshold = 3;
    return (
      <main>
        <Header />
        <h3 data-testid="feedback-text">
          { assertions < answerThreshold ? 'Could be better...' : 'Well Done!' }
        </h3>
        <span>Total score: </span>
        <span data-testid="feedback-total-score">{ score }</span>
        <span>Total assertions: </span>
        <span data-testid="feedback-total-question">{ assertions }</span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.requestLoginPage() }
        >
          Play Again
        </button>
        <button
          type="button"
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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
