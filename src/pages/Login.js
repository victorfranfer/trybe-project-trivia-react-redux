import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    nome: '',
    email: '',
    isDisable: true,
  };

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

  requestTrivia = async () => {
    const { history } = this.props;
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const token = await response.json();
    console.log(token.token);
    localStorage.setItem('token', JSON.stringify(token.token));
    history.push('/game');
  };

  requestPageSettings = () => {
    const { history } = this.props;
    history.push('/settings');
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
            onClick={ () => this.requestTrivia() }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.requestPageSettings() }
          >
            Configurações
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
