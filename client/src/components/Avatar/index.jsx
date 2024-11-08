import React from 'react';
import CONSTANTS from '../../constants';

const { ANONYM_IMAGE_PATH, publicURL } = CONSTANTS;

const Avatar = ({ avatar, className }) => {
  return (
    <img
      src={avatar === 'anon.png' ? ANONYM_IMAGE_PATH : `${publicURL}${avatar}`}
      alt="user"
      className={className}
    />
  );
};

export default Avatar;
