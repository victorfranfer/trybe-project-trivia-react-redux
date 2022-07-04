import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableOptions, resetTimerAction } from '../redux/actions';

let myInterval = null;

class Timer extends React.Component {
  state = {
    secondsLeft: 30,
  }

  startTimer = () => {
    const oneSecond = 1000;
    myInterval = setInterval(
      () => this.setState((prevState) => ({ secondsLeft: prevState.secondsLeft - 1 })),
      oneSecond,
    );
  }

  componentDidMount = () => {
    this.startTimer();
  }

  setStateAfterUpdate = () => {
    const { secondsLeft } = this.state;
    const { timer } = this.props;
    timer(secondsLeft);
  }

  componentDidUpdate = (prevProps, previousState) => {
    const { stopTimer, reset, resetState } = this.props;
    const { secondsLeft } = previousState;
    if (secondsLeft === 1 || stopTimer) {
      clearInterval(myInterval);
      this.setStateAfterUpdate();
    } if (reset && prevProps.reset !== reset) {
      resetState();
      this.resetTimer();
    }
  }

  componentWillUnmount = () => {
    this.setState({ secondsLeft: 30 });
  }

  resetTimer = () => {
    this.setState({
      secondsLeft: 30,
    });
    this.startTimer();
  };

  render() {
    const { secondsLeft } = this.state;

    return (
      <h2 data-testid="timer">
        { `${secondsLeft} seconds` }
      </h2>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
  resetState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  timer: (seconds) => dispatch(disableOptions(seconds)),
  resetState: () => dispatch(resetTimerAction()),
});

export default connect(null, mapDispatchToProps)(Timer);
