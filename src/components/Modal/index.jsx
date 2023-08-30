import React, { Component } from 'react';
class Modal extends Component {
  render() {
    return (
      this.props.isModalOpen && (
        <div>
          <div>
            <img src={this.props.imagesrc} alt={this.props.alt}></img>
          </div>
          <button onClick={this.props.handleOpenModal}>x</button>
        </div>
      )
    );
  }
}
export default Modal;
