import React from 'react';
import { useSelector } from 'react-redux';
import Event from './Event';
import styles from './Events.module.scss';

const Events = () => {
  const { events, expiredEvents } = useSelector((state) => state.events);
  console.log(expiredEvents);
  const renderEvents = (event) => <Event key={event.id} event={event} />;
  const sortedArray = [...events].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
  return (
    <section className={styles.eventsContaier}>
      <ul>
        {!sortedArray.length ? (
          <p>You have no events yet</p>
        ) : (
          sortedArray.map(renderEvents)
        )}
      </ul>
    </section>
  );
};

export default Events;
