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
    // const { secondsLeft } = this.state;
    const oneSecond = 1000;
    myInterval = setInterval(
      () => this.setState((prevState) => ({ secondsLeft: prevState.secondsLeft - 1 })),
      oneSecond,
    );
  }

  setStateAfterUpdate = () => {
    const { timer } = this.props;
    timer();
  }

  componentDidUpdate = (prevProps, previousState) => {
    const { secondsLeft } = previousState;
    // const oneSecond = 1000;
    if (secondsLeft === 1) {
      clearInterval(myInterval);
      console.log(secondsLeft);
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
};

const mapDispatchToProps = (dispatch) => ({
  timer: () => dispatch(disableOptions()),
});

export default connect(null, mapDispatchToProps)(Timer);
