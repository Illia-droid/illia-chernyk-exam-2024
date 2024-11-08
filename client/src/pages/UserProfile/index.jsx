import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cashOut, clearPaymentStore } from '../../store/slices/paymentSlice';
import { changeProfileViewMode } from '../../store/slices/userProfileSlice';
import Header from '../../components/Header';
import UserInfo from '../../components/UserInfo';
import PayForm from '../../components/PayForm';
import Error from '../../components/Error';
import OptionButton from '../../components/OptionButton';
import CONSTANTS from '../../constants';
import styles from './UserProfile.module.sass';

const { USER_INFO_MODE, CREATOR, CASHOUT_MODE } = CONSTANTS;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { balance, role } = useSelector((state) => state.userStore.data);
  const { profileViewMode } = useSelector((state) => state.userProfile);
  const { error } = useSelector((state) => state.payment);

  const handleChangeProfileViewMode = (mode) =>
    dispatch(changeProfileViewMode(mode));

  const cashout = (values) => {
    const { number, expiry, cvc, sum } = values;
    dispatch(
      cashOut({
        number,
        expiry,
        cvc,
        sum,
      })
    );
  };
  const clearPaymentError = () => dispatch(clearPaymentStore());

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <aside className={styles.aside}>
          <h2 className={styles.headerAside}>Select Option</h2>
          <section className={styles.optionsContainer}>
            <OptionButton
              isActive={profileViewMode === USER_INFO_MODE}
              label="User Info"
              onClick={() => handleChangeProfileViewMode(USER_INFO_MODE)}
            />
            {role === CREATOR && (
              <OptionButton
                isActive={profileViewMode === CASHOUT_MODE}
                label="Cashout"
                onClick={() => handleChangeProfileViewMode(CASHOUT_MODE)}
              />
            )}
          </section>
        </aside>
        <section className={styles.container}>
          {profileViewMode === USER_INFO_MODE ? (
            <UserInfo />
          ) : (
            <div>
              {parseInt(balance) === 0 ? (
                <p className={styles.notMoney}>
                  There is no money on your balance
                </p>
              ) : (
                <div>
                  {error && (
                    <Error
                      data={error.data}
                      status={error.status}
                      clearError={clearPaymentError}
                    />
                  )}
                  <PayForm sendRequest={cashout} />
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default UserProfile;
