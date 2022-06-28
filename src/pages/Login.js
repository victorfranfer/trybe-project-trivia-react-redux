import React from 'react';

class Login extends React.Component {
  state = {
    nome: '',
    email: '',
    isDisable: true,
  }

  handleChange = (target) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
    this.isDisabled();
  };

  isDisabled = () => {
    const { nome, email } = this.state;
    if (nome.length >= 1 && email.length >= 1) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  render() {
    const { nome, email, isDisable } = this.state;

    return (
      <form>
        <div>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              id="nome"
              data-testid="input-player-name"
              value={ nome }
              onChange={ (event) => this.handleChange(event.target) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ (event) => this.handleChange(event.target) }
            />
          </label>
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisable }
          >
            Play
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
