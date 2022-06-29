import React from 'react';

class Timer extends React.Component {
  state = {
    secondsLeft: 30,
    isDisabled: false,
  }

  countDown = () => {
    const { secondsLeft } = this.state;
    const counter = secondsLeft - 1;
    this.setState({
      secondsLeft: counter,
    });
    if (secondsLeft === 0) {
      this.setState({
        isDisabled: true,
      });
    }
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

export default Timer;
