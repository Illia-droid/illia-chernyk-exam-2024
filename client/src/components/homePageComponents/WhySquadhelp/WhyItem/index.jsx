import React from 'react';
import CONSTANTS from '../../../../constants';
import styles from './WhyItem.module.sass';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const WhyItem = ({ item }) => {
  const { src, alt, title, content } = item;
  return (
    <div className={styles.card}>
      <img src={`${STATIC_IMAGES_PATH}${src}`} alt={alt} />
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default WhyItem;
