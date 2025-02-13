import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './BackButton.module.scss';

const BackButton = ({ history, className = styles.buttonContainer }) => {
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <button
      onClick={handleGoBack}
      className={className}
      aria-label="Go back"
    >
      <span>Back</span>
    </button>
  );
};

BackButton.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string,
};

export default withRouter(BackButton);
