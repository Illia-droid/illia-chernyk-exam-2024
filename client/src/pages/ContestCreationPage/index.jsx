import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { saveContestToStore } from '../../store/slices/contestCreationSlice';
import NextButton from '../../components/buttons/NextButton';
import ContestForm from '../../components/forms/ContestForm';
import BackButton from '../../components/buttons/BackButton';
import ProgressBar from '../../components/ProgressBar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from './ContestCreationPage.module.scss';

const ContestCreationPage = ({ contestType, history, title }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const {
    contestCreationStore: { contests },
    bundleStore: { bundle },
  } = useSelector((state) => state);

  useEffect(() => {
    if (!bundle) {
      history.push('/startContest');
    }
  }, [bundle, history]);

  const contestData = contests[contestType] || {
    contestType,
  };

  const handleSubmit = (values) => {
    dispatch(saveContestToStore({ type: contestType, info: values }));
    const route =
      bundle[contestType] === 'payment'
        ? '/payment'
        : `${bundle[contestType]}Contest`;
    history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.startContestHeader}>
          <div className={styles.startContestInfo}>
            <h2>{title}</h2>
            <span>
              Tell us a bit more about your business as well as your preferences
              so that creatives get a better idea about what you are looking for
            </span>
          </div>
          <ProgressBar currentStep={2} />
        </section>
        <section className={styles.container}>
          <div className={styles.formContainer}>
            <ContestForm
              contestType={contestType}
              handleSubmit={handleSubmit}
              formRef={formRef}
              defaultData={contestData}
            />
          </div>
        </section>
        <section className={styles.footerButtonsContainer}>
          <div className={styles.lastContainer}>
            <div className={styles.buttonsContainer}>
              <BackButton />
              <NextButton submit={submitForm} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

ContestCreationPage.propTypes = {
  contestType: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default ContestCreationPage;
