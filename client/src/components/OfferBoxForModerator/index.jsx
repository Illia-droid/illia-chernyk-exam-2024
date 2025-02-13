import React from 'react';
import { useDispatch } from 'react-redux';
import { changeShowImage } from '../../store/slices/contestByIdSlice';
import CONSTANTS from '../../constants';
import styles from './OfferBoxForModerator.module.scss';
import Avatar from '../Avatar';

const { publicURL } = CONSTANTS;

const OfferBoxForModerator = ({ data, handleModeratorStatus }) => {
  const dispatch = useDispatch();
  const { id, fileName, text, User, Contest } = data;
  const { email } = User;
  const { User: customer, contestType, industry } = Contest;
  const { firstName, email: customerEmail } = customer;
  return (
    <section className={styles.offerContainer}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.customerInfoContainer}>
          <div className={styles.nameAndEmail}>
            <span>Customer:</span>
            <p>{firstName}</p>
            <p>{customerEmail}</p>
          </div>
          <Avatar avatar={customer.avatar} className={styles.avatar} />
        </div>
        <div className={styles.contestWrapper}>
          <div className={styles.contestInfo}>
            <span>Contest:</span>
            <p>
              <span>Type:</span> {contestType}
            </p>
            <p>
              <span>Industry:</span> {industry}
            </p>
          </div>
        </div>
        <div className={styles.responseConainer}>
          {fileName ? (
            <img
              onClick={() =>
                dispatch(
                  changeShowImage({
                    imagePath: fileName,
                    isShowOnFull: true,
                  })
                )
              }
              className={styles.responseLogo}
              src={`${publicURL}${fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{text}</span>
          )}
        </div>
        <div className={styles.btnsContainer}>
          <button
            className={styles.resolveBtn}
            onClick={() =>
              handleModeratorStatus({ id, status: 'successful', email })
            }
          >
            successful
          </button>
          <button
            className={styles.rejectBtn}
            onClick={() =>
              handleModeratorStatus({ id, status: 'decline', email })
            }
          >
            decline
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfferBoxForModerator;
