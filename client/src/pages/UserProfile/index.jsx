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
import styles from './UserProfile.module.scss';

const { USER_INFO_MODE, CREATOR, CASHOUT_MODE } = CONSTANTS;

const buttons = [
  { label: 'User Info', mode: USER_INFO_MODE },
  { label: 'Cashout', mode: CASHOUT_MODE },
];

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
  const renderButtons = ({ label, mode }) => (
    <OptionButton
      key={label}
      isActive={profileViewMode === mode}
      label={label}
      onClick={() => handleChangeProfileViewMode(mode)}
    />
  );
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        {role === CREATOR && (
          <aside className={styles.aside}>
            <h2 className={styles.headerAside}>Select Option</h2>
            <section className={styles.optionsContainer}>
              {buttons.map(renderButtons)}
            </section>
          </aside>
        )}
        <>
          {profileViewMode === USER_INFO_MODE ? (
            <UserInfo />
          ) : (
            <>
              {parseInt(balance) === 0 ? (
                <p className={styles.notMoney}>
                  There is no money on your balance
                </p>
              ) : (
                <>
                  {error && (
                    <Error
                      data={error.data}
                      status={error.status}
                      clearError={clearPaymentError}
                    />
                  )}
                  <PayForm sendRequest={cashout} />
                </>
              )}
            </>
          )}
        </>
      </main>
    </>
  );
};

export default UserProfile;
