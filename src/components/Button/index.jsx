import React, { Component } from 'react';

class Button extends Component {
  render() {
    return <button onClick={this.props.fetchMoreImages}>Load more</button>;
  }
}
export default Button;
