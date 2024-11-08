import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
import PayForm from '../../components/PayForm';
import Error from '../../components/Error';
import Logo from '../../components/Logo';
import CONSTANTS from '../../constants';
import styles from './Payment.module.sass';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.payment);
  const contests = useSelector((state) => state.contestCreationStore.contests);
  useEffect(() => {
    if (isEmpty(contests)) {
      history.replace('startContest');
    }
  }, [history, contests]);

  const cleanPaymentStore = () => dispatch(clearPaymentStore());

  const calculatePrice = (contestCount) => {
    return contestCount === 1
      ? 100
      : contestCount * 100 * (1 - contestCount / 10);
  };

  const createFormData = (values) => {
    const contestArray = Object.values(contests).map((contest) => ({
      ...contest,
      haveFile: !!contest.file,
    }));
    const { number, expiry, cvc } = values;
    const data = new FormData();
    contestArray.forEach((contest) => {
      if (contest.file) {
        data.append('files', contest.file);
      }
    });
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', calculatePrice(contestArray.length));
    return data;
  };

  const payment = (values) => {
    const data = createFormData(values);
    dispatch(
      pay({
        data: {
          formData: data,
        },
        history,
      })
    );
  };

  const calculatedPrice = calculatePrice(Object.values(contests).length);

  return (
    <>
      <header className={styles.header}>
        <Logo
          src={`${STATIC_IMAGES_PATH}blue-logo.png`}
          className={styles.logo}
          alt="blue_logo"
        />
      </header>
      <main className={styles.mainContainer}>
        <section className={styles.paymentContainer}>
          <h1 className={styles.headerLabel}>Checkout</h1>
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={cleanPaymentStore}
            />
          )}
          <PayForm
            sendRequest={payment}
            calculatedPrice={calculatedPrice}
            isPayForOrder
          />
        </section>
        <aside className={styles.orderInfoContainer}>
          <h2 className={styles.orderHeader}>Order Summary</h2>
          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>
            <span className={styles.packagePrice}>${calculatedPrice} USD</span>
          </div>
          <div className={styles.resultPriceContainer}>
            <span>Total:</span>
            <span>${calculatedPrice} USD</span>
          </div>
          <a href="http://www.google.com">Have a promo code?</a>
        </aside>
      </main>
    </>
  );
};

export default Payment;
