import React from 'react';
import Header from '../../components/Header';
import Events from '../../components/Events';
import EventForm from '../../components/Events/EventForm';
import styles from './EventsPage.module.scss';

const EventsPage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <EventForm />
        <Events />
      </main>
    </>
  );
};

export default EventsPage;
