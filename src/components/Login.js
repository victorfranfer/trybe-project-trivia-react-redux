import React from 'react';

class Login extends React.Component {
    state ={
      token: '',
    }

    requestTrivia = async () => {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await response.json();
      console.log(token.token);
      this.setState({
        token,
      });
      localStorage.setItem('token', JSON.stringify(token.token));
    }

    render() {
      return (
        <div>
          <button
            type="button"
            onClick={ () => this.requestTrivia() }
          >
            Play
          </button>
        </div>
      );
    }
}

export default Login;
