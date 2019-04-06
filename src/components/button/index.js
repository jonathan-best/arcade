import React, { Component } from 'react';
import './style.scss';

class Button extends Component {

  constructor(){
    super();
    this.state = {
      direction: 'UP'
    }
  }

  setDirection = (direction) => {
    this.setState({ direction })
  }

  keyup = (event) => {
    const { keyCode } = this.props;
    if(event.keyCode === keyCode){
      this.setDirection('UP')
    }
  }

  keydown = (event) => {
    const { keyCode } = this.props;
    if(event.keyCode === keyCode){
      this.setDirection('DOWN')
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
      <span className={`acd-button acd-button--${this.state.direction}`} />
    );
  }
}

export default Button;
