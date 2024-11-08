import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './BackButton.module.sass';

const BackButton = ({ history, className }) => {
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <button
      onClick={handleGoBack}
      className={className || styles.buttonContainer}
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

BackButton.defaultProps = {
  className: styles.buttonContainer,
};

export default withRouter(BackButton);
