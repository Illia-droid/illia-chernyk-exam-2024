import React from 'react';
import styles from './NextButton.module.scss';

const NextButton = ({ submit }) => {
  return (
    <button type="submit" onClick={submit} className={styles.buttonContainer}>
      <span>Next</span>
    </button>
  );
};

export default NextButton;
