import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './AdvInfo.module.scss';

import dataSponsors from './dataSponsors.json';
import dataStats from './dataStats.json';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const AdvInfo = () => {
  const renderSponsors = (sponsor, i) => (
    <div key={i} className={styles.images}>
      <img
        src={`${STATIC_IMAGES_PATH}${sponsor.images.inactive}`}
        alt={sponsor.alt}
      />
      <img
        src={`${STATIC_IMAGES_PATH}${sponsor.images.active}`}
        alt={sponsor.alt}
      />
    </div>
  );
  const renderStats = (stat, i) => (
    <div key={i}>
      <p>{stat.value}</p>
      <span>{stat.label}</span>
    </div>
  );
  return (
    <div className={styles.greyContainer}>
      <div className={styles.adv}>{dataSponsors.map(renderSponsors)}</div>
      <div className={styles.stats}>{dataStats.map(renderStats)}</div>
    </div>
  );
};

export default AdvInfo;
