import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const InvadersGame = lazy(() => import('./invaders'));

class Game extends Component {
  constructor() {
    super();
    this.game = null;
  }

  render() {
    return (
      <Suspense fallback={<div />}>
        {this.props.variant === 'invaders' && <InvadersGame />}
      </Suspense>
    );
  }
}

Game.propTypes = {
  variant: PropTypes.oneOf(['invaders']),
}

export default Game;
