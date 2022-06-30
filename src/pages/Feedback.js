import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    const answerThreshold = 3;
    return (
      <main>
        <Header />
        <h3 data-testid="feedback-text">
          { score < answerThreshold ? 'Could be better...' : 'Well done!' }
        </h3>
      </main>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
