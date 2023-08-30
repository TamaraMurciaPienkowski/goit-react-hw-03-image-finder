import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import { Loader } from './Loader';

class App extends Component {
  state = {
    images: [],
    inputSearch: '',
    isModalOpen: false,
    selectedImage: '',
    alt: '',
    imgagesrc: '',
    page: 2,
    isLoading: false,
  };

  async componentDidMount() {
    this.fetchImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.inputSearch !== this.state.inputSearch) {
      this.fetchImages();
    }
    if (this.state.inputSearch.length === 0) {
      this.setState(prevState => ({ ...prevState, images: [] }));
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });
    try {
      const { inputSearch } = this.state;
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=1&key=36752814-0630461e212967e8c9b2204d7&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState(prevState => ({ ...prevState, images: data.hits }));
    } catch (error) {
      console.log('errr', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  fetchMoreImages = async () => {
    this.setState({ isLoading: true });
    try {
      const { inputSearch, page } = this.state;
      const nextPage = page + 1;
      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=36752814-0630461e212967e8c9b2204d7&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      this.setState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...data.hits],
        page: nextPage,
      }));
    } catch (error) {
      console.log('errr', error);
    } finally {
      this.setState({ isLoading: false });
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

  handleOpenModal = evt => {
    this.alt = evt.target.dataset.alt;
    this.imagesrc = evt.target.dataset.webformaturl;
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };
  render() {
    return (
      <div>
        <Searchbar
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          inputSearch={this.state.inputSearch}
        />
        {!this.state.isModalOpen}
        <Modal
          isModalOpen={this.state.isModalOpen}
          imagesrc={this.imagesrc}
          alt={this.alt}
          handleOpenModal={this.handleOpenModal}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            images={this.state.images}
            handleOpenModal={this.handleOpenModal}
          />
        )}
        <Button fetchMoreImages={this.fetchMoreImages} />
      </div>
    );
  }
}

export default App;
