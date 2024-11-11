import React from 'react';
import { useSelector } from 'react-redux';
import { getOfferTimeStr } from '../../utils/functions.js';
import CONSTANTS from '../../constants.js';
import styles from './ContestSideBar.module.sass';
import Avatar from '../Avatar/index.jsx';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const ContestSideBar = ({ totalEntries, contestData }) => {
  const data = useSelector((state) => state.userStore);
  const { User, prize, createdAt } = contestData;
  const { id, avatar, firstName, lastName, displayName } = User;
  return (
    <aside className={styles.contestSideBarInfo}>
      <section className={styles.contestInfo}>
        <div className={styles.awardAndTimeContainer}>
          <div className={styles.prizeContainer}>
            <img src={`${STATIC_IMAGES_PATH}big-diamond.png`} alt="diamond" />
            <span>{`$ ${prize}`}</span>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeDesc}>
              <img src={`${STATIC_IMAGES_PATH}clock.png`} alt="clock" />
              <span>Going</span>
            </div>
            <time className={styles.time}>{getOfferTimeStr(createdAt)}</time>
          </div>
          <div className={styles.guaranteedPrize}>
            <div>
              <img src={`${STATIC_IMAGES_PATH}smallCheck.png`} alt="check" />
            </div>
            <span>Guaranteed prize</span>
          </div>
        </div>
        <section className={styles.contestStats}>
          <span>Contest Stats</span>
          <div className={styles.totalEntrie}>
            <span className={styles.totalEntriesLabel}>Total Entries</span>
            <span>{totalEntries}</span>
          </div>
        </section>
      </section>
      {data.id !== id && (
        <section className={styles.infoCustomerContainer}>
          <span className={styles.labelCustomerInfo}>About Contest Holder</span>
          <div className={styles.customerInfo}>
            <Avatar avatar={avatar} />
            <div className={styles.customerNameContainer}>
              <span>{firstName}</span>
              <span>{lastName}</span>
              <span>{displayName}</span>
            </div>
          </div>
        </section>
      )}
    </aside>
  );
};

export default ContestSideBar;
