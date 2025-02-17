import React from 'react';
import styles from './ContestInfo.module.scss';

const TaglineContestSpecialInfo = ({ nameVenture, typeOfTagline }) => {
  return (
    <>
      {nameVenture && (
        <div className={styles.dataContainer}>
          <span className={styles.label}>Name ventrure</span>
          <span className={styles.data}>{nameVenture}</span>
        </div>
      )}
      <div className={styles.dataContainer}>
        <span className={styles.label}>Type of Taglinee</span>
        <span className={styles.data}>{typeOfTagline}</span>
      </div>
    </>
  );
};

export default TaglineContestSpecialInfo;
