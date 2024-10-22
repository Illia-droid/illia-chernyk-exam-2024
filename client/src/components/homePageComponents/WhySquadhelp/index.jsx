import React from 'react';
import styles from './WhySquadhelp.module.sass';

import dataWhyContent from './dataWhyContent.json';
import WhyItem from './WhyItem';

const WhySquadhelp = () => {
  const renderWhyItems = (item, i) => <WhyItem key={i} item={item} />;
  return (
    <div className={styles.container__description}>
      <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
      <div className={styles.cardContainer}>
        {dataWhyContent.map(renderWhyItems)}
      </div>
    </div>
  );
};

export default WhySquadhelp;