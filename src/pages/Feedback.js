import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = this.props;
    const answerThreshold = 3;
    return (
      <main>
        <Header />
        <h3 data-testid="feedback-text">
          { score < answerThreshold ? 'Could be better...' : 'Well done!' }
        </h3>
        <span>Total score: </span>
        <span data-testid="feedback-total-score">{ score }</span>
        <span>Total assertions: </span>
        <span data-testid="feedback-total-question">{ assertions }</span>
      </main>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
