import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ serchResult, onClickImg }) => {
  return (
    <ul className={styles.gallery}>
      {serchResult.map(({ id, smallImg, largeImg, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImage={smallImg}
          largeImage={largeImg}
          tags={tags}
          onClickImg={onClickImg}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  serchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;
