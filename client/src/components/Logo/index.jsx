import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants.js';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const Logo = ({ to, alt, ...props }) => (
  <Link to={to}>
    <img alt={alt} {...props} />
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  to: '/',
  src: `${STATIC_IMAGES_PATH}blue-logo.png`,
  alt: 'logo',
};

export default Logo;
