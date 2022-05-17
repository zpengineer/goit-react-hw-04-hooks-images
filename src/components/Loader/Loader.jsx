import { Bars } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Bars heigth="30" width="50" ariaLabel="loading-indicator" color="grey" />
    </div>
  );
};

export default Loader;
