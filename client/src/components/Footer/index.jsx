import React from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

const { FooterItems } = CONSTANTS;

const Footer = () => {
  const renderFooterItems = (item) => (
    <section key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <a key={i} href="https://google.com">
          {i}
        </a>
      ))}
    </section>
  );

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{FooterItems.map(renderFooterItems)}</div>
      </div>
    </footer>
  );
};

export default Footer;
