import React from 'react';
import { useDispatch } from 'react-redux';
import { changeShowImage } from '../../store/slices/contestByIdSlice';
import CONSTANTS from '../../constants';
import styles from './OfferBoxForModerator.module.scss';

const { publicURL } = CONSTANTS;

const OfferBoxForModerator = ({ data, handleModeratorStatus }) => {
  const dispatch = useDispatch();
  const { id, fileName, text, User } = data;
  const { email } = User;

  return (
    <section className={styles.offerContainer}>
      <div className={styles.mainInfoContainer}>
        <div>
          <span>Offer:</span>
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
