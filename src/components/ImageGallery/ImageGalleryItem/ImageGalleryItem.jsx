import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, largeImage, tags, onClickImg }) => {
  return (
    <li className={styles.galleryItem}>
      <img
        id="img-item"
        className={styles.img}
        src={smallImage}
        data-source={largeImage}
        alt={tags}
        onClick={onClickImg}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
