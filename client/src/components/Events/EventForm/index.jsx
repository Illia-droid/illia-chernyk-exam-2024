import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { createEvent } from '../../../store/slices/eventsSlice';
import Schems from '../../../utils/validators/validationSchems';
import styles from './EventForm.module.scss';

const EventForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, formikBag) => {
    dispatch(createEvent(values));
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={{
        body: '',
        deadline: moment().format('yyyy-MM-DDTHH:mm'),
        userHours: 1,
      }}
      onSubmit={onSubmit}
      validationSchema={Schems.EventSchema}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          <span>Event name:</span>
          <Field name="body" placeholder="Your event name" className={styles.input} />
          <ErrorMessage name="body" component="div" className={styles.error} />
        </label>
        <label className={styles.label}>
          <span>Deadline:</span>
          <Field
            name="deadline"
            type="datetime-local"
            className={styles.input}
          />
          <ErrorMessage
            name="deadline"
            component="div"
            className={styles.error}
          />
        </label>
        <label className={styles.label}>
          <span>Hours until notification:</span>
          <Field name="userHours" type="number" min='1' max='24' className={styles.input} />
          <ErrorMessage
            name="userHours"
            component="div"
            className={styles.error}
          />
        </label>
        <button type="submit" className={styles.button}>
          Add Event
        </button>
      </Form>
    </Formik>
  );
};

export default EventForm;
