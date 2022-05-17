import { useState, useEffect } from 'react';
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

function App() {
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [currentImgTag, setCurrentImgTag] = useState('');
  const [currentLargeImg, setCurrentLargeImg] = useState('');

  useEffect(() => {
    async function fetchImages() {
      try {
        setStatus('pending');

        await pixabayAPI(query, page).then(res => {
          let getData = res.data.hits;
          let mapData = mapper(getData);

          if (mapData.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          } else {
            setImages(prevState => [...prevState, ...mapData]);
          }
        });
      } catch (error) {
        toast.warn(
          "We're sorry, but you've reached the end of search results."
        );
      } finally {
        setStatus('resolved');

        if (page > 1) {
          setTimeout(smoothScroll, 250);
        }
      }
    }

    if (query !== '') {
      fetchImages();
    }
  }, [query, page]);

  useEffect(() => {
    pageHeader();
  });

  const handleLoadMore = e => {
    e.preventDefault();

    setPage(prevState => prevState + 1);
  };

  const onToggle = () => {
    setModal(prevState => !prevState);
  };

  const handleFormSubmit = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const onClickImg = e => {
    const currentImgTag = e.target.alt;
    const currentLargeImg = e.target.dataset.source;

    setCurrentImgTag(currentImgTag);
    setCurrentLargeImg(currentLargeImg);

    onToggle();
  };

  const smoothScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;

    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  const pageHeader = () => {
    const { height: pageHeaderHeight } = document
      .querySelector('#header')
      .getBoundingClientRect();

    document.body.style.paddingTop = `${pageHeaderHeight}px`;
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' && (
        <div className={styles.notification}>
          Gallery is empty, search for images.
        </div>
      )}

      {images.length > 0 && (
        <ImageGallery serchResult={images} onClickImg={onClickImg} />
      )}

      {status === 'pending' && <Loader />}

      {images.length > 0 && status === 'resolved' && (
        <Button loadMore={handleLoadMore} />
      )}

      {modal && (
        <Modal onClose={onToggle} src={currentLargeImg} alt={currentImgTag} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default App;
