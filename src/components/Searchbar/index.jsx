import React, { Component } from 'react';

class Searchbar extends Component {
  render() {
    return (
      <header>
        <form onSubmit={this.props.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            type="text"
            name="inputSearch"
            value={this.props.inputSearch}
            onChange={this.props.handleChange}
          ></input>
        </form>
      </header>
    );
  }
}

export default Searchbar;
