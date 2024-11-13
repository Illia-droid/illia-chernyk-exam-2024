import React from 'react';
import StepItem from './StepItem';
import styles from './HowDoNameContestWork.module.scss'
import dataStepItem from './dataStepItem.json';

const HowDoNameContestWork = () => {
  const renderStepItems = (item, i) => <StepItem key={i} item={item} />;
  return (
    <section>
      <h2 className={styles.header}>How Do Name Contest Work?</h2>
      {dataStepItem.map(renderStepItems)}
    </section>
  );
};

export default HowDoNameContestWork;
