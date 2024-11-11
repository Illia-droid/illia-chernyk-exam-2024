import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import {
  changeMark,
  clearChangeMarkError,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import OpenChatButton from '../OpenChatButton';
import Avatar from '../Avatar';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const {
  OFFER_STATUS: { REJECTED, WON },
  STATIC_IMAGES_PATH,
  LOGO_CONTEST,
  publicURL,
  CREATOR,
} = CONSTANTS;

const OfferBox = ({ data, contestType, setOfferStatus, needButtons }) => {
  const dispatch = useDispatch();
  const { id: authUserId, role } = useSelector((state) => state.userStore.data);
  const { id: offerId, status, mark, fileName, text, User } = data;
  const { id: creatorId, avatar, firstName, lastName, email, rating } = User;

  const handleOfferStatusChange = (status) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus(creatorId, offerId, status),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleChangeMark = (value) => {
    dispatch(clearChangeMarkError());
    dispatch(
      changeMark({
        mark: value,
        offerId,
        isFirst: !mark,
        creatorId,
      })
    );
  };

  const offerStatus = () => {
    const statusIcons = {
      [REJECTED]: {
        iconClass: 'fas fa-times-circle reject',
        style: styles.reject,
      },
      [WON]: {
        iconClass: 'fas fa-check-circle resolve',
        style: styles.resolve,
      },
    };

    const currentStatus = statusIcons[status];

    return currentStatus ? (
      <i className={classNames(currentStatus.iconClass, currentStatus.style)} />
    ) : null;
  };

  const renderRatingStars = (initialRating, readOnly, onClick) => {
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
        onClick={onClick}
      />
    );
  };

  const renderStatusButton = (label, status, style) => (
    <button onClick={() => handleOfferStatusChange(status)} className={style}>
      {label}
    </button>
  );

  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
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
          {contestType === LOGO_CONTEST ? (
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
          {creatorId !== authUserId &&
            renderRatingStars(mark, false, handleChangeMark)}
        </div>
        {role !== CREATOR && <OpenChatButton User={User} />}
      </div>
      {needButtons(status) && (
        <div className={styles.btnsContainer}>
          {renderStatusButton('Resolve', 'resolve', styles.resolveBtn)}
          {renderStatusButton('Reject', 'reject', styles.rejectBtn)}
        </div>
      )}
    </div>
  );
};

export default withRouter(OfferBox);
