import React from 'react';
import WhyItem from './WhyItem';
import styles from './WhySquadhelp.module.scss';
import dataWhyContent from './dataWhyContent.json';

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
