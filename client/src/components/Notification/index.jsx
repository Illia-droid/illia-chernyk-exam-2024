import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.scss';

const Notification = (props) => {
  const goToExtended = () => props.history.push(`/contest/${props.contestId}`);
  return (
    <div>
      <br />
      <span>{props.message}</span>
      <br />
      {props.contestId && (
        <span onClick={goToExtended} className={styles.goToContest}>
          Go to contest
        </span>
      )}
    </div>
  );
};

export default withRouter(Notification);
