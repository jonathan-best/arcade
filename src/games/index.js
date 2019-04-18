import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const InvadersGame = lazy(() => import('./invaders'));
const PacmanGame = lazy(() => import('./pacman'));

class Game extends Component {
  constructor() {
    super();
    this.game = null;
  }

  render() {
    const { variant } = this.props;
    return (
      <Suspense fallback={<div />}>
        {variant === 'invaders' && <InvadersGame />}
        {variant === 'pacman' && <PacmanGame />}
      </Suspense>
    );
  }
}

Game.propTypes = {
  variant: PropTypes.oneOf(['invaders', 'pacman']),
}

export default Game;
