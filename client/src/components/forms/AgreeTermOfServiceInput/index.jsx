import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field } from 'formik';

const AgreeTermOfServiceInput = ({ id, type, classes, to, ...rest }) => {
  return (
    <Field {...rest}>
      {({ meta: { touched, error }, field }) => (
        <>
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
        </>
      )}
    </Field>
  );
};

AgreeTermOfServiceInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
};

AgreeTermOfServiceInput.defaultProps = {
  id: 'termsOfService',
  type: 'checkbox',
  to: 'https://www.google.com',
};

export default AgreeTermOfServiceInput;
