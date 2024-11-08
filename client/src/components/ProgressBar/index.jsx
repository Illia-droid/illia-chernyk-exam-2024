import React from 'react';
import styles from './ProgressBar.module.sass';

const progressBarSteps = [1, 2, 3];

const ProgressBar = ({ currentStep }) => {
  const renderBar = (count) => {
    let classOuter = styles.outerNotActive;
    let classInner = styles.innerNotActive;
    let classProgress = '';
    if (count === currentStep) {
      classOuter = styles.outerActive;
      classInner = styles.innerActive;
      classProgress = styles.progressContainer;
    }
    if (count < currentStep) {
      classOuter = styles.outerComplete;
      classInner = styles.innerComplete;
    }
    return (
      <div className={classProgress} key={count}>
        <div className={styles.progressBarContainer}>
          <div className={classOuter}>
            <div className={classInner} />
          </div>
          {count < progressBarSteps.length && (
            <div className={styles.lineBar} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.progressBarContainer}>
      {progressBarSteps.map(renderBar)}
    </div>
  );
};
export default ProgressBar;
