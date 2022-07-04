import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { nome, score, gravatarEmail } = this.props;

    const gravatar = md5(gravatarEmail).toString();

    return (
      <header className="player-header">
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt={ nome }
          data-testid="header-profile-picture"
        />
        <div className="player-score" data-testid="header-score">
          { `Score: ${score}` }
        </div>
        <div className="player-name" data-testid="header-player-name">
          { `Player: ${nome}` }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
