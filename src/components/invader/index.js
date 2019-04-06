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
  render() {
    return (
      <div className="acd-invader">
        {
          matrix.map((row, i) => {
            const squares = row.map((row) => {
              return row ? <span className={`acd-invader-square--${this.props.variant}`} /> :
                <span className="acd-invader-square--clear" />
            });
            return <span className="acd-invader-row">{squares}</span>
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
