import { Component } from 'react';
import './style.css';

export default class PlainButton extends Component {
  render() {
    return (
      <button type="button" className={this.props.className} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}