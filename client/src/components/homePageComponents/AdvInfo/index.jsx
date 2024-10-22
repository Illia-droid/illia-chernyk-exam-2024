import React from 'react';
import styles from './AdvInfo.module.sass';

import dataSponsors from './dataSponsors.json';
import dataStats from './dataStats.json';
import CONSTANTS from '../../../constants';

const AdvInfo = () => {
  const renderSponsors = (sponsor, i) => (
    <div key={i} className={styles.images}>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}${sponsor.images.inactive}`}
        alt={sponsor.alt}
      />
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}${sponsor.images.active}`}
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
