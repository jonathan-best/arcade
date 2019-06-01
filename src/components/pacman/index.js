import React, { PureComponent } from 'react';
import './style.scss';

class Pacman extends PureComponent {
  changeGame = () => {
    this.props.changeGame('pacman')
  }

  render() {
    return (
      <div className="acd-pacman" onClick={this.changeGame} />
    );
  }
}

export default Pacman;
