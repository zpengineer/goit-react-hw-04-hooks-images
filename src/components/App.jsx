import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import pixabayAPI from './services/pixabay-api';
import { mapper } from './services/mapper';

import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Container from './Container';
import Modal from './Modal';
import Loader from './Loader/Loader';
import styles from './App.module.css';

class App extends Component {
  state = {
    isShow: false,
    searchQuery: '',
    serchResult: [],
    page: 1,
    status: 'idle',
    currentImgTag: '',
    currentLargeImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages();
    }
  }

  componentDidMount() {
    this.pageHeader();
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ status: 'pending' });

      await pixabayAPI(searchQuery, page).then(res => {
        let getData = res.data.hits;
        let mapData = mapper(getData);

        if (mapData.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.',
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          this.setState(prevState => ({
            serchResult: [...prevState.serchResult, ...mapData],
          }));
        }
      });
    } catch (error) {
      toast.warn("We're sorry, but you've reached the end of search results.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      this.setState({ status: 'resolved' });

      if (page > 1) {
        setTimeout(this.smoothScroll, 250);
      }
    }
  };

  handleLoadMore = e => {
    const { page } = this.state;

    e.preventDefault();

    this.setState({ page: page + 1 });
  };

  onToggle = () => {
    this.setState(({ isShow }) => ({ isShow: !isShow }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, serchResult: [] });
  };

  onClickImg = e => {
    const currentImgTag = e.target.alt;
    const currentLargeImg = e.target.dataset.source;

    this.setState({ currentImgTag, currentLargeImg });

    this.onToggle();
  };

  pageHeader = () => {
    const { height: pageHeaderHeight } = document
      .querySelector('#header')
      .getBoundingClientRect();

    document.body.style.paddingTop = `${pageHeaderHeight}px`;
  };

  smoothScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;

    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { serchResult, status, isShow, currentImgTag, currentLargeImg } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <div className={styles.notification}>
            Gallery is empty, search for images.
          </div>
        )}

        {serchResult.length > 0 && (
          <ImageGallery
            serchResult={serchResult}
            onClickImg={this.onClickImg}
          />
        )}

        {status === 'pending' && <Loader />}

        {serchResult.length > 0 && status === 'resolved' && (
          <Button loadMore={this.handleLoadMore} />
        )}

        {isShow && (
          <Modal
            onClose={this.onToggle}
            src={currentLargeImg}
            alt={currentImgTag}
          />
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}

export default App;
