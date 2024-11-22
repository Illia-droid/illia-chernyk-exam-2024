import React from 'react';
import styles from './BottomBlock.module.scss';

const BottomBlock = () => {
  return (
    <section className={styles.bottomBlock}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.leftBlock}>
            <div className={styles.allright}>Copyright © 2024 Atom.com </div>
            <div className={styles.dot}></div>
            <a href="/how-it-works" className={styles.tdPreferences}>
              Consent Preferences
            </a>
          </div>

          <div>
            <a
              className={styles.approved}
              href="https://www.trustpilot.com/review/atom.com"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.paymentMethod}>
                <div className={styles.trustPilot}>
                  <strong>Excellent</strong>
                  <div className={styles.tpStars}>
                    <div className={styles.star}></div>
                    <div className={styles.star}></div>
                    <div className={styles.star}></div>
                    <div className={styles.star}></div>
                    <div className={styles.halfStar}></div>
                  </div>
                  <div className={styles.tpName}>
                    <div className={styles.icon}></div>
                    <span>Trustpilot</span>
                  </div>
                </div>
                <div className={styles.footerRatings}>
                  <div className={styles.basedOn}>
                    <div>
                      <strong itemProp="ratingValue">
                        4.7 /<span itemProp="bestRating">5</span>
                      </strong>
                    </div>
                    <p>
                      based on <span itemProp="ratingCount"> 345 ratings</span>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className={styles.social}>
            <a
              href="https://www.facebook.com/atomdotcom"
              rel="noreferrer"
              aria-label="Facebook"
              target="_blank"
            >
              <div className={styles.facebook}></div>
            </a>
            <a
              href="https://twitter.com/squadhelp"
              rel="noreferrer"
              aria-label="Twitter"
              target="_blank"
            >
              <div className={styles.twitter}></div>
            </a>
            <a
              href="https://www.instagram.com/workwithatom/"
              rel="noreferrer"
              aria-label="Instagram"
              target="_blank"
            >
              <div className={styles.instagam}></div>
            </a>
            <a
              href="https://www.linkedin.com/company/atomdotcom/"
              rel="noreferrer"
              aria-label="LinkedIn"
              target="_blank"
            >
              <div className={styles.in}></div>
            </a>
            <a
              href="https://www.youtube.com/@atomdotcom"
              rel="noreferrer"
              aria-label="YouTube"
              target="_blank"
            >
              <div className={styles.youtube}></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBlock;
