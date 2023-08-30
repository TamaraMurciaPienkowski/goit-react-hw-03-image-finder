import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
class ImageGallery extends Component {
  render() {
    return this.props.images.length > 0 ? (
      <div>
        <ul onClick={this.props.handleOpenModal}>
          <ImageGalleryItem images={this.props.images} />
        </ul>
      </div>
    ) : (
      <div>No results</div>
    );
  }
}

export default ImageGallery;
