import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import { clearUserError } from '../../store/slices/userSlice';

import ImageUpload from '../InputComponents/ImageUpload';
import FormInput from '../FormInput';
import Error from '../Error';

import styles from './UpdateUserInfoForm.module.sass';
import Schems from '../../utils/validators/validationSchems';

const UpdateUserInfoForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const { data, error, isFetching } = useSelector((state) => state.userStore);

  const initialValues = {
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: data.displayName,
  };

  const handleClearError = () => {
    dispatch(clearUserError());
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form encType="multipart/form-data" className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={handleClearError}
          />
        )}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            name="lastName"
            type="text"
            label="Last Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <ImageUpload
          name="file"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
        <button type="submit" disabled={isFetching}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateUserInfoForm;
