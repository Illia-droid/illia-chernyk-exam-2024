import React, { useEffect } from 'react';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';

import styles from '../OfferBox/OfferBox.module.scss';
import Avatar from '../Avatar';
import CONSTANTS from '../../constants';
import { changeShowImage } from '../../store/slices/contestByIdSlice';

const { STATIC_IMAGES_PATH, publicURL } = CONSTANTS;

const OfferBoxForModerator = ({ data, handleModeratorStatus }) => {
  const dispatch = useDispatch();
  const { id, fileName, text, User } = data;
  const { avatar, firstName, lastName, email, rating } = User;
  const renderRatingStars = (initialRating, readOnly) => {
    const starIconPath = `${STATIC_IMAGES_PATH}star.png`;
    const starOutlineIconPath = `${STATIC_IMAGES_PATH}star-outline.png`;
    return (
      <Rating
        initialRating={initialRating}
        fractions={2}
        fullSymbol={<img src={starIconPath} alt="star" />}
        placeholderSymbol={<img src={starIconPath} alt="star" />}
        emptySymbol={<img src={starOutlineIconPath} alt="star-outline" />}
        readonly={readOnly}
      />
    );
  };

  return (
    <div className={styles.offerContainer}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <Avatar avatar={avatar} />
            <div className={styles.nameAndEmail}>
              <span>{firstName}</span>
              <span>{lastName}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            {renderRatingStars(rating, true)}
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
        <div>
          <button
            onClick={() =>
              handleModeratorStatus({ id, status: 'successful', email })
            }
          >
            successful
          </button>
          <button
            onClick={() =>
              handleModeratorStatus({ id, status: 'decline', email })
            }
          >
            decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferBoxForModerator;