import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteEvent, setIsExpired } from '../../../store/slices/eventsSlice';
import styles from './Event.module.scss';

const formatSeconds = (seconds) => {
  let days = Math.floor(seconds / (3600 * 24));
  let hours = Math.floor((seconds % (3600 * 24)) / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;
  let formattedTime = '';

  if (days > 0) {
    formattedTime += days + 'd ';
  }
  if (hours > 0) {
    formattedTime += hours + 'h ';
  }
  if (minutes > 0) {
    formattedTime += minutes + 'm ';
  }
  if (remainingSeconds > 0) {
    formattedTime += remainingSeconds + 's';
  }

  return formattedTime;
};

const Event = ({
  event: { id, body, isExpired, deadline, createdAt, notificationAt },
}) => {
  const [difference, setDifference] = useState(
    moment(deadline).diff(moment(), 'seconds')
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setDifference((prevDifference) => prevDifference - 1);
    }, 1000);

    if (difference <= 0) {
      clearInterval(timerInterval);
      return null;
    }

    if (!isExpired && moment().isSameOrAfter(notificationAt)) {
      dispatch(setIsExpired({ id }));
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [id, dispatch, isExpired, notificationAt, difference]);

  const deadlineDifference = moment(deadline).diff(
    moment(createdAt),
    'seconds'
  );
  const positionPercentage =
    difference > 0 ? (difference / deadlineDifference) * 100 : '0';

  const handleDelete = () => dispatch(deleteEvent({ id }));

  return (
    <li className={styles.event}>
      <div
        className={styles.timer}
        style={{ right: `${positionPercentage}%` }}
      ></div>

      <p className={styles.eventName}>{body}</p>
      <div className={styles.time}>
        <span className={styles.time}>
          {formatSeconds(difference) || 'complete!'}
        </span>
        {isExpired && <img src="/bell.svg" alt="bell" width="25px" />}
        <button className={styles.butt} onClick={handleDelete}>
          <img src="/trash-can-svgrepo-com.svg" alt="trash" width="40px" />
        </button>
      </div>
    </li>
  );
};

export default Event;
