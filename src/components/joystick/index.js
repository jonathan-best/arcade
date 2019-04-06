import React, { Component } from 'react';
import './style.scss';

class Joystick extends Component {

  constructor(){
    super();
    this.state = {
      direction: 'CENTER'
    }
  }

  setDirection = (direction) => {
    this.setState({ direction })
  }

  keyup = (event) => {
    if([37, 38, 39, 40].includes(event.keyCode)){
      this.setDirection('CENTER')
    }
  }

  keydown = (event) => {
    switch(event.keyCode) {
      case 38:
        this.setDirection('UP')
        break;
      case 40:
        this.setDirection('DOWN')
        break;
      case 37:
        this.setDirection('LEFT')
        break;
      case 39:
        this.setDirection('RIGHT')
        break;
      default:
        break;
    }
  }

  componentDidMount () {
    document.addEventListener("keydown", this.keydown, false)
    document.addEventListener("keyup", this.keyup, false)
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", this.keydown, false);
    document.removeEventListener("keyup", this.keyup, false)
  }

  render() {
    return (
      <div className="acd-joystick">
        <div className={`acd-joystick__origin acd-joystick--${this.state.direction}`}>
          <span className="acd-joystick__ball" />
          <span className="acd-joystick__stalk" />
        </div>
      </div>
    );
  }
}

export default Joystick;
