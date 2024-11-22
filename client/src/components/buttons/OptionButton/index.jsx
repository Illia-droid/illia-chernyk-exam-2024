import React from 'react';
import classNames from 'classnames';
import styles from './UserProfile.module.scss';

const OptionButton = ({ isActive, label, onClick, className }) => {

  const buttonClass =
    className ||
    classNames(styles.optionButton, {
      [styles.currentOption]: isActive,
    });

  return (
    <button className={buttonClass} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};

export default OptionButton;
