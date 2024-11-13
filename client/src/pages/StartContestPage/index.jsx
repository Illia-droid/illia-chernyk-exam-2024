import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBundle } from '../../store/slices/bundleSlice';
import { clearContestStore } from '../../store/slices/contestCreationSlice';
import BundleBox from '../../components/BundleBox';
import Footer from '../../components/Footer';
import ProgressBar from '../../components/ProgressBar';
import Header from '../../components/Header';
import CONSTANTS from '../../constants';
import styles from './StartContestPage.module.scss';
import data from './dataBundleBox.json';

const { CUSTOMER } = CONSTANTS;

const StartContestPage = ({ history }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.userStore.data);
  const { bundleData, combinedBundleData } = data;

  useEffect(() => {
    dispatch(clearContestStore());
    if (role !== CUSTOMER) {
      history.replace();
    }
  }, [dispatch, history, role]);

  const setBundle = (bundleStr) => {
    const array = bundleStr.toLowerCase().split('+');
    const bundleList = array.reduce(
      (acc, curr, index) => {
        acc[curr] = index === array.length - 1 ? 'payment' : array[index + 1];
        return acc;
      },
      { first: array[0] }
    );

    dispatch(updateBundle(bundleList));
    history.push(`/startContest/${bundleList.first}Contest`);
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.startContestHeader}>
          <div className={styles.startContestInfo}>
            <h1 className={styles.headerStart} >START A CONTEST</h1>
            <p className={styles.descriptionStart}>
              Launching a contest on Squadhelp is very simple. Select the type
              of contest you would like to launch from the list below. Provide a
              detailed brief and select a pricing package. Begin receiving
              submissions instantly!
            </p>
          </div>
          <ProgressBar currentStep={1} />
        </section>
        <section className={styles.baseBundleContainer}>
          <div className={styles.infoBaseBundles}>
            <h2 className={styles.headerInfo}>
              Our Most Popular <span>Categories</span>
            </h2>
            <p className={styles.info}>
              Pick from our most popular categories, launch a contest and begin
              receiving submissions right away.
            </p>
          </div>
          <div className={styles.baseBundles}>
            {bundleData.map((bundle) => (
              <BundleBox
                key={bundle.header}
                {...bundle}
                setBundle={setBundle}
              />
            ))}
          </div>
        </section>
        <section className={styles.combinedBundles}>
          <div className={styles.infoCombinedBundles}>
            <h2 className={styles.headerInfo}>Save With Our Bundle Packages</h2>
            <p className={styles.info}>
              Launch multiple contests and pay a discounted bundle price.
            </p>
          </div>
          <div className={styles.baseBundles}>
            {combinedBundleData.map((bundle) => (
              <BundleBox
                key={bundle.header}
                {...bundle}
                setBundle={setBundle}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StartContestPage;
