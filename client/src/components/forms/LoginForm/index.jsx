import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import { checkAuth, clearAuth } from '../../../store/slices/authSlice';

import FormInput from '../FormInput';
import Error from '../../Error';

import Schems from '../../../utils/validators/validationSchems';
import styles from './LoginForm.module.scss';
import CONSTANTS from '../../../constants';

const { AUTH_MODE } = CONSTANTS;

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();

  const {
    auth: { error, isFetching },
  } = useSelector((state) => state);

  const authClear = () => dispatch(clearAuth());

  useEffect(() => {
    return () => {
      authClear();
    }; //eslint-disable-next-line
  }, []);

  const handleSubmit = (values) => {
    dispatch(checkAuth({ data: values, history, authMode: AUTH_MODE.LOGIN }));
  };
  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginForm}>
      {error && (
        <Error data={error.data} status={error.status} clearError={authClear} />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Schems.LoginSchem}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />
          <button
            type="submit"
            disabled={isFetching}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
