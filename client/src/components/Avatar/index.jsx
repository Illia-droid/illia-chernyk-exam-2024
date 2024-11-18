import React from 'react';
import CONSTANTS from '../../constants';

const { ANONYM_IMAGE_PATH, publicURL } = CONSTANTS;

const Avatar = ({ avatar, className }) => {
  return (
    <img
      src={avatar ? `${publicURL}${avatar}` : ANONYM_IMAGE_PATH}
      alt="user"
      className={className}
    />
  );
};

export default Avatar;
