import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableOptions } from '../redux/actions';

let myInterval = null;

class Timer extends React.Component {
  state = {
    secondsLeft: 30,
  }

  componentDidMount = () => {
    const oneSecond = 1000;
    myInterval = setInterval(
      () => this.setState((prevState) => ({ secondsLeft: prevState.secondsLeft - 1 })),
      oneSecond,
    );
  }

  setStateAfterUpdate = () => {
    const { secondsLeft } = this.state;
    const { timer } = this.props;
    timer(secondsLeft);
  }

  componentDidUpdate = (prevProps, previousState) => {
    const { stopTimer } = this.props;
    const { secondsLeft } = previousState;
    if (secondsLeft === 1 || stopTimer) {
      clearInterval(myInterval);
      this.setStateAfterUpdate();
    }
  }

  componentWillUnmount = () => {
    this.setState({ secondsLeft: 30 });
  }

  render() {
    const { secondsLeft } = this.state;

    return (
      <h2>
        { secondsLeft }
        segundos
      </h2>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  timer: (seconds) => dispatch(disableOptions(seconds)),
});

export default connect(null, mapDispatchToProps)(Timer);
