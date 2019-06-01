import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const matrix = [
  [0,0,1,0,0,0,0,0,1,0,0],
  [0,0,0,1,0,0,0,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,1,1,0,1,1,1,0,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,1],
  [0,0,0,1,1,0,1,1,0,0,0],
]

class Invader extends PureComponent {

  changeGame = () => {
    this.props.changeGame('invaders')
  }

  render() {
    return (
      <div className="acd-invader" onClick={this.changeGame}>
        {
          matrix.map((row, i) => {
            const squares = row.map((row, y) => {
              return row ? <span className={`acd-invader-square--${this.props.variant}`} key={`acd-invader-square-${i}-${y}`} /> :
                <span className="acd-invader-square--clear" key={`acd-invader-square-${i}-${y}`} />
            });
            return <span className="acd-invader-row" key={`acd-invader-row-${i}`}>{squares}</span>
          })
        }
      </div>
    );
  }
}

Invader.propTypes = {
  variant: PropTypes.oneOf(['blue', 'yellow', 'orange', 'pink', 'green']),
}

export default Invader;
