import React, { useEffect } from 'react';
import styles from './Error.module.scss';

const Error = ({ clearError, status, data }) => {
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);
  const getMessage = () => {
    switch (status) {
      case 404:
        return data;
      case 400:
        return 'Check the input data';
      case 409:
        return data;
      case 403:
        return 'Bank decline transaction';
      case 406:
        return data;
      default:
        return 'Server Error';
    }
  };

  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <i className="far fa-times-circle" onClick={() => clearError()} />
    </div>
  );
};

export default Error;
