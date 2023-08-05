import React, { Component } from 'react';
class Modal extends Component {
  state = {
    isModalOpen: false,
  };

  handleOpenModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };
  render() {
    return (
      <div>
        <h1>Tu jest Modal</h1>
        {!this.state.isModalOpen && (
          <button onClick={this.handleOpenModal}>modal</button>
        )}

        {this.state.isModalOpen && (
          <div>
            <div>ELO POKAZUJE SIE</div>
            <button onClick={this.handleOpenModal}>x</button>
          </div>
        )}
      </div>
    );
  }
}

export default Modal;
