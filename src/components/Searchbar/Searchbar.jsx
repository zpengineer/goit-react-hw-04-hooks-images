import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  static props = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Oops! Entered an empty string', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={styles.searchbar} id="header">
        <form className={styles.form}>
          <button
            type="submit"
            className={styles.button}
            onClick={this.handleSubmit}
          >
            <span className={styles.label}>
              <BsSearch size={24} />
            </span>
          </button>

          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="searchQuery"
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
