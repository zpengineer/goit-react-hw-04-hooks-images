import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button className={styles.button} type="button" onClick={loadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
