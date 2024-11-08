import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/slices/userSlice';
import { changeEditModeOnUserProfile } from '../../store/slices/userProfileSlice';
import UpdateUserInfoForm from '../UpdateUserInfoForm';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';
import Avatar from '../Avatar';

const { CREATOR } = CONSTANTS;

const UserInfo = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userStore);
  const { isEdit } = useSelector((state) => state.userProfile);
  const { avatar, firstName, lastName, displayName, email, role, balance } =
    data;

  const userInfoFields = [
    { label: 'First Name', value: firstName },
    { label: 'Last Name', value: lastName },
    { label: 'Display Name', value: displayName },
    { label: 'Email', value: email },
    { label: 'Role', value: role },
    ...(role === CREATOR ? [{ label: 'Balance', value: `${balance}$` }] : []),
  ];

  const updateUserData = (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    dispatch(updateUser(formData));
  };

  const toggleEditMode = () => dispatch(changeEditModeOnUserProfile(!isEdit));

  const renderUserInfoFields = ({ label, value }) => (
    <div className={styles.infoBlock} key={label}>
      <span className={styles.label}>{label}</span>
      <span className={styles.info}>{value}</span>
    </div>
  );
  return (
    <section className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm handleSubmit={updateUserData} />
      ) : (
        <article className={styles.infoContainer}>
          <Avatar avatar={avatar} className={styles.avatar} />
          <div className={styles.infoContainer}>
            {userInfoFields.map(renderUserInfoFields)}
          </div>
        </article>
      )}
      <button onClick={toggleEditMode} className={styles.buttonEdit}>
        {isEdit ? 'Cancel' : 'Edit'}
      </button>
    </section>
  );
};

export default UserInfo;
