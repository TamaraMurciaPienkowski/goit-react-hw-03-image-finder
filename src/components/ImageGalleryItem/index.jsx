import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return this.props.images.map(el => (
      <li key={el.id}>
        <img
          src={el.webformatURL}
          alt={el.tags}
          data-webformaturl={el.largeImageURL}
          data-alt={el.tags}
        ></img>
      </li>
    ));
  }
}
export default ImageGalleryItem;
