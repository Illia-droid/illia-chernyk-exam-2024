import React from 'react';
import { getOfferTimeStr } from '../../../utils/functions.js';
import CONSTANTS from '../../../constants';
import styles from './ContestBox.module.scss';

const { NAME_CONTEST, LOGO_CONTEST, STATIC_IMAGES_PATH } = CONSTANTS;

const ContestBox = ({ data, history }) => {
  const {
    id,
    title,
    contestType,
    prize,
    count,
    createdAt,
    typeOfName,
    brandStyle,
    typeOfTagline,
  } = data;

  const getPreferenceContest = () => {
    if (contestType === NAME_CONTEST) return typeOfName;
    if (contestType === LOGO_CONTEST) return brandStyle;
    return typeOfTagline;
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const goToExtended = () => {
    history.push(`/contest/${id}`);
  };

  return (
    <div className={styles.contestBoxContainer} onClick={goToExtended}>
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img
                src={`${STATIC_IMAGES_PATH}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img
              src={`${STATIC_IMAGES_PATH}diamond.png`}
              alt="diamond"
            />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img
              src={`${STATIC_IMAGES_PATH}entrieImage.png`}
              alt="logo"
            />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>
            {getOfferTimeStr(createdAt)}
          </span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
};

export default ContestBox;
