import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { createEvent } from '../../../store/slices/eventsSlice';
import Schems from '../../../utils/validators/validationSchems';
import styles from './EventForm.module.scss';

const EventForm = () => {
  const dispatch = useDispatch();
  const [deadline, setDeadline] = useState(moment().format('yyyy-MM-DDTHH:mm'));

  const onSubmit = (values, formikBag) => {
    dispatch(createEvent(values));
    formikBag.resetForm();
  };

  const initialValues = {
    body: '',
    deadline: moment().add(1, 'minute').format('yyyy-MM-DDTHH:mm'),
    notificationAt: moment().format('yyyy-MM-DDTHH:mm'),
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={Schems.EventSchema}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            <span>Event name:</span>
            <Field
              name="body"
              placeholder="Your event name"
              className={styles.input}
            />
            <ErrorMessage
              name="body"
              component="div"
              className={styles.error}
            />
          </label>
          <label className={styles.label}>
            <span>Deadline:</span>
            <Field
              name="deadline"
              type="datetime-local"
              min={moment().format('yyyy-MM-DDTHH:mm')}
              className={styles.input}
              onChange={(e) => {
                const newDeadline = e.target.value;
                setDeadline(newDeadline);
                setFieldValue('deadline', newDeadline);
              }}
            />
            <ErrorMessage
              name="deadline"
              component="div"
              className={styles.error}
            />
          </label>
          <label className={styles.label}>
            <span> Notification at:</span>
            <Field
              name="notificationAt"
              type="datetime-local"
              className={styles.input}
              min={moment().format('yyyy-MM-DDTHH:mm')}
              max={deadline}
            />
            <ErrorMessage
              name="notificationAt"
              component="div"
              className={styles.error}
            />
          </label>
          <button type="submit" className={styles.button}>
            Add Event
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
