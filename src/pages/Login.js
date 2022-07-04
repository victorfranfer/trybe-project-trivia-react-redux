import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';
import './Login.css';

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
    localStorage.setItem('token', token.token);
    history.push('/game');
  };

  requestPageSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  submitForm = () => {
    const { nome, email } = this.state;
    const { playGame } = this.props;
    playGame({ nome, email });
    this.requestTrivia();
  };

  render() {
    const { nome, email, isDisable } = this.state;

    return (
      <id id="login">
        <form className="card">
          <div className="card-header">
            <h2>Login</h2>
          </div>
          <div className="card-content">
            <div className="card-content-area">
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
            <div className="card-content-area">
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
          </div>
          <div className="footer">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisable }
              onClick={ () => this.submitForm() }
            >
              Play
            </button>
            <div className='footer-1'>
              <button
                type="button"
                data-testid="btn-settings"
                onClick={ () => this.requestPageSettings() }
              >
                Configurações
              </button>
            </div>
          </div>
        </form>
      </id>
    );
  }
}

Login.propTypes = {
  playGame: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  playGame: (login) => dispatch(loginAction(login)),
});

export default connect(null, mapDispatchToProps)(Login);
