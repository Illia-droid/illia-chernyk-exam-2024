import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PayForm from '../../components/PayForm/PayForm';
import Error from '../../components/Error/Error';
import Logo from '../../components/Logo';
import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
import styles from './Payment.module.sass';
import CONSTANTS from '../../constants';

const Payment = (props) => {
  const pay = (values) => {
    const { contests } = props.contestCreationStore;
    const contestArray = [];
    Object.keys(contests).forEach((key) =>
      contestArray.push({ ...contests[key] })
    );
    const { number, expiry, cvc } = values;
    const price =
      contestArray.length === 1
        ? 100
        : contestArray.length * 100 * (1 - contestArray.length / 10);
    const data = new FormData();
    for (let i = 0; i < contestArray.length; i++) {
      data.append('files', contestArray[i].file);
      contestArray[i].haveFile = !!contestArray[i].file;
    }
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', price);
    props.pay({
      data: {
        formData: data,
      },
      history: props.history,
    });
  };

  const goBack = () => {
    props.history.goBack();
  };

  const { contests } = props.contestCreationStore;

  const calculatedPrice =
    Object.keys(contests).length === 1
      ? 100
      : Object.keys(contests).length *
        100 *
        (1 - Object.keys(contests).length / 10);
  const { error } = props.payment;
  const { clearPaymentStore } = props;
  if (isEmpty(contests)) {
    props.history.replace('startContest');
  }
  return (
    <div>
      <div className={styles.header}>
        <Logo
          src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
          className={styles.logo}
          alt="blue_logo"
        />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.paymentContainer}>
          <span className={styles.headerLabel}>Checkout</span>
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={clearPaymentStore}
            />
          )}
          <PayForm
            sendRequest={pay}
            back={goBack}
            calculatedPrice={calculatedPrice}
            isPayForOrder
          />
        </div>
        <div className={styles.orderInfoContainer}>
          <span className={styles.orderHeader}>Order Summary</span>
          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>
            <span className={styles.packagePrice}>${calculatedPrice} USD</span>
          </div>
          <div className={styles.resultPriceContainer}>
            <span>Total:</span>
            <span>${calculatedPrice} USD</span>
          </div>
          <a href="http://www.google.com">Have a promo code?</a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
  contestCreationStore: state.contestCreationStore,
});

const mapDispatchToProps = (dispatch) => ({
  pay: ({ data, history }) => dispatch(pay({ data, history })),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
