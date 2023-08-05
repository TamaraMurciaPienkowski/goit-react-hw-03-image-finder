import React, { Component } from 'react';
class Gallery extends Component {
  state = {
    images: [],
    inputSearch: '',
    isModalOpen: false,
    selectedImage: '',
  };
  // async componentDidMount() {
  //   this.fetchImages();
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.inputSearch !== this.state.inputSearch) {
      this.fetchImages();
    }
    if (this.state.inputSearch.length === 0) {
      this.setState(prevState => ({ ...prevState, images: [] }));
    }
  }
  fetchImages = async () => {
    try {
      const { inputSearch } = this.state;
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=1&key=36752814-0630461e212967e8c9b2204d7&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState(prevState => ({ ...prevState, images: data.hits }));
    } catch (error) {
      console.log('errr', error);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchImages();
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState(prevstate => ({ ...prevstate, [name]: value }));
  };

  handleOpenModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    return (
      <header>
        {/* <h1>szukam: {this.state.inputSearch}</h1> */}
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            type="text"
            name="inputSearch"
            value={this.state.inputSearch}
            onChange={this.handleChange}
          ></input>
        </form>
        {this.state.images.length > 0 ? (
          <div>
            {this.state.images.map(el => (
              <li key={el.id}>
                <img src={el.webformatURL} alt={el.tags}></img>
              </li>
            ))}
            <div>
              <h1>Tu jest Modal</h1>
              {!this.state.isModalOpen && (
                <button onClick={this.handleOpenModal}>modal</button>
              )}

              {this.state.isModalOpen && (
                <div>
                  <div>
                    <img
                      src={this.state.images[0].webformatURL}
                      alt={this.state.images.tags}
                    ></img>
                  </div>
                  <button onClick={this.handleOpenModal}>x</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>No results</div>
        )}
      </header>
    );
  }
}
export default Gallery;
