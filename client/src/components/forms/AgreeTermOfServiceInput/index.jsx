import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'formik';

const AgreeTermOfServiceInput = ({
  id = 'termsOfService',
  type = 'checkbox',
  classes,
  to = 'https://www.google.com',
  ...rest
}) => {
  return (
    <Field {...rest}>
      {({ meta: { touched, error }, field }) => (
        <div
          className={cx(classes.container, {
            [classes.warning]: touched && error,
          })}
        >
          <input {...field} id={id} type={type} />
          <label htmlFor={id}>
            <a href={to} target="_blank" rel="noreferrer">
              Terms of Service
            </a>
          </label>
        </div>
      )}
    </Field>
  );
};

AgreeTermOfServiceInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  to: PropTypes.string, 
};

export default AgreeTermOfServiceInput;
