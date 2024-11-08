import React from 'react';
import styles from './StepItem.module.sass';
import CONSTANTS from '../../../../constants';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const StepItem = (props) => {
  const {
    item: {
      classNameWrapper,
      classItemRow,
      stepName,
      stepDescription,
      src,
      alt,
    },
  } = props;

  const renderStepDescription = (step, i) => (
    <p key={i}>
      <i className="fas fa-check" />
      <span>{step}</span>
    </p>
  );
  return (
    <div className={styles[classNameWrapper]}>
      <div className={styles[classItemRow]}>
        <div>
          <h3>{stepName}</h3>
          {stepDescription.map(renderStepDescription)}
        </div>
        <img src={`${STATIC_IMAGES_PATH}${src}`} alt={alt} />
      </div>
    </div>
  );
};

export default StepItem;
