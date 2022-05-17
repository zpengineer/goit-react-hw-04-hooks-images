import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Oops! Entered an empty string');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleSearchQuery = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className={styles.searchbar} id="header">
      <form className={styles.form}>
        <button type="submit" className={styles.button} onClick={handleSubmit}>
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
          value={query}
          onChange={handleSearchQuery}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
