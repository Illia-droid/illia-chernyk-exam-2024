import React, { useRef } from 'react';
import CONSTANTS from '../../constants';
import styles from './BundleBox.module.sass';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const BundleBox = ({ path, setBundle, header, describe }) => {
  const defaultPathToImages = `${STATIC_IMAGES_PATH}contestLabels/`;
  const imageContainerRef = useRef();

  const renderImages = () =>
    path.map((imagePath, i) => (
      <img
        src={`${defaultPathToImages}${imagePath}`}
        alt={imagePath.replace(/.png/g, 'Contest')}
        key={i}
        className={styles.imgContainer}
      />
    ));

  const changeImageSrc = (color) => {
    const images = imageContainerRef.current.children;
    Array.from(images).forEach((img, i) => {
      img.src = `${defaultPathToImages}${color ? 'blue_' : ''}${path[i]}`;
    });
  };

  const getBackClass = () =>
    path.length === 1 ? ' ' : ` ${styles.combinedBundle}`;

  return (
    <article
      onMouseOver={() => changeImageSrc(true)}
      onMouseOut={() => changeImageSrc(false)}
      onClick={() => setBundle(header)}
      id={header}
      className={styles.bundleContainer + getBackClass()}
    >
      <div ref={imageContainerRef}>{renderImages()}</div>
      <div className={styles.infoContainer}>
        <h3 className={styles.bundleName}>{header}</h3>
        <hr />
        <p className={styles.infoBundle}>{describe}</p>
      </div>
    </article>
  );
};

export default BundleBox;
