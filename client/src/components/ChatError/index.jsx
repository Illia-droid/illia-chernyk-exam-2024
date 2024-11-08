import React from 'react';
import styles from './ChatError.module.sass';

const ChatError = ({ getData }) => {
  return (
    <section className={styles.errorContainer} onClick={getData}>
      <div className={styles.container}>
        <span>Server Error</span>
        <i className="fas fa-redo" />
      </div>
    </section>
  );
};

export default ChatError;
