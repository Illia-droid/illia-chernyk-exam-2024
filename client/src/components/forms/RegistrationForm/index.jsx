import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { checkAuth, clearAuth } from '../../../store/slices/authSlice';
import Error from '../../Error';
import FormInput from '../FormInput';
import RoleInput from '../RoleInput';
import AgreeTermOfServiceInput from '../AgreeTermOfServiceInput';
import CONSTANTS from '../../../constants';
import Schems from '../../../utils/validators/validationSchems';
import styles from './RegistrationForm.module.scss';

const {
  CUSTOMER,
  CREATOR,
  AUTH_MODE: { REGISTER },
} = CONSTANTS;

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
  valid: styles.valid,
};

const initialValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: CUSTOMER,
  agreeOfTerms: false,
};

const RegistrationForm = ({ history }) => {
  const dispatch = useDispatch();
  const { error, isFetching } = useSelector((state) => state.auth);
  const authClear = () => dispatch(clearAuth());

  useEffect(() => {
    return () => {
      authClear();
    }; //eslint-disable-next-line
  }, []);

  const handleSubmit = (values) => {
    dispatch(
      checkAuth({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          displayName: values.displayName,
          email: values.email,
          password: values.password,
          role: values.role,
        },
        history,
        authMode: REGISTER,
      })
    );
  };

  return (
    <section className={styles.signUpFormContainer}>
      {error && (
        <Error data={error.data} status={error.status} clearError={authClear} />
      )}
      <div className={styles.headerFormContainer}>
        <h2>CREATE AN ACCOUNT</h2>
        <h4>We always keep your name and email address private.</h4>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schems.RegistrationSchem}
      >
        <Form>
          <div className={styles.row}>
            <FormInput
              name="firstName"
              classes={formInputClasses}
              type="text"
              label="First name"
            />
            <FormInput
              name="lastName"
              classes={formInputClasses}
              type="text"
              label="Last name"
            />
          </div>
          <div className={styles.row}>
            <FormInput
              name="displayName"
              classes={formInputClasses}
              type="text"
              label="Display Name"
            />
            <FormInput
              name="email"
              classes={formInputClasses}
              type="text"
              label="Email Address"
            />
          </div>
          <div className={styles.row}>
            <FormInput
              name="password"
              classes={formInputClasses}
              type="password"
              label="Password"
            />
            <FormInput
              name="confirmPassword"
              classes={formInputClasses}
              type="password"
              label="Password confirmation"
            />
          </div>
          <div className={styles.choseRoleContainer}>
            <Field
              name="role"
              type="radio"
              value={CUSTOMER}
              strRole="Join As a Buyer"
              infoRole="I am looking for a Name, Logo or Tagline for my business, brand or product."
              component={RoleInput}
              id={CUSTOMER}
            />
            <Field
              name="role"
              type="radio"
              value={CREATOR}
              strRole="Join As a Creative"
              infoRole="I plan to submit name ideas, Logo designs or sell names in Domain Marketplace."
              component={RoleInput}
              id={CREATOR}
            />
          </div>
          <div className={styles.termsOfService}>
            <AgreeTermOfServiceInput
              name="agreeOfTerms"
              classes={{
                container: styles.termsOfService,
                warning: styles.fieldWarning,
              }}
              id="termsOfService"
              type="checkbox"
            />
          </div>
          <button
            type="submit"
            disabled={isFetching}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>Create Account</span>
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default RegistrationForm;
