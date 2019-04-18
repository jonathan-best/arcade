import React, { Component } from 'react';
import Joystick from '../joystick';
import Button from '../button';
import Invader from '../invader';
import Pacman from '../pacman';
import './style.scss';

class Cabinet extends Component {
  render() {
    return (
      <div className="acd-cabinet">
        <div className="acd-top">
          <h1>SLAMCO</h1>
          <Invader variant="pink" />
          <Invader variant="green" />
          <Invader variant="yellow" />
          <Invader variant="blue" />
        </div>
        <div className="acd-window">
          <div className="acd-screen">
            {this.props.children}
          </div>
          <Joystick />
        </div>
        <div className="acd-controls">
          <Button keyCode={32} />
          <Button keyCode={31} />
          <Button keyCode={30} />
        </div>
        <div className="acd-front">
          <Pacman />
        </div>
      </div>
    );
  }
}

export default Cabinet;
