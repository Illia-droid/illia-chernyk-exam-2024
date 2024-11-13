import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SlideBar from '../../components/SlideBar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import WhySquadhelp from '../../components/homePageComponents/WhySquadhelp';
import HowDoNameContestWork from '../../components/homePageComponents/HowDoNameContestWork';
import AdvInfo from '../../components/homePageComponents/AdvInfo';
import CONSTANTS from '../../constants';
import CAROULES_CONSTANTS from '../../carouselConstants';
import styles from './Home.module.scss';

const { HEADER_ANIMATION_TEXT } = CONSTANTS;
const {
  MAIN_SLIDER_IMAGES,
  MAIN_SLIDER,
  EXAMPLE_SLIDER_IMAGES,
  EXAMPLE_SLIDER,
  FEEDBACK_SLIDER_IMAGES,
  FEEDBACK_SLIDER,
} = CAROULES_CONSTANTS;

const Home = () => {
  const { isFetching } = useSelector((state) => state.userStore);
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle(styles.headline__isloading);
    }, 3000);
    return () => {
      setStyle(styles.headline__static);
      clearInterval(timeout);
    };
  });

  const text = HEADER_ANIMATION_TEXT[index % HEADER_ANIMATION_TEXT.length];
  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <main className={styles.container}>
            <div className={styles.headerBar}>
              <div className={styles.headline}>
                <span>Find the Perfect Name for</span>
                <span className={styleName}>{text}</span>
              </div>
              <p>
                Launch a naming contest to engage hundreds of naming experts as
                you’re guided through our agency-level naming process. Or,
                explore our hand-picked collection of premium names available
                for immediate purchase
              </p>
              <div className={styles.button}>
                <Link className={styles.button__link} to="/dashboard">
                  DASHBOARD
                </Link>
              </div>
            </div>
            <div className={styles.greyContainer}>
              <SlideBar
                images={MAIN_SLIDER_IMAGES}
                carouselType={MAIN_SLIDER}
              />
            </div>
            <WhySquadhelp />
            <AdvInfo />
            <HowDoNameContestWork />
            <div className={styles.headerBar}>
              <h3>Names For Sale</h3>
              <p className={styles.blueUnderline}>
                Not interested in launching a contest? Purchase a name instantly
                from our hand-picked collection of premium names. Price includes
                a complimentary Trademark Report, a Domain name as well as a
                Logo design
              </p>
            </div>
            <SlideBar
              images={EXAMPLE_SLIDER_IMAGES}
              carouselType={EXAMPLE_SLIDER}
            />
            <div className={styles.button}>
              <Link className={styles.button__link} to="/dashboard">
                DASHBOARD
              </Link>
            </div>
            <div className={styles.blueContainer}>
              <h2 className={styles.whiteUnderline}>What our customers say</h2>
              <SlideBar
                images={FEEDBACK_SLIDER_IMAGES}
                carouselType={FEEDBACK_SLIDER}
              />
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
