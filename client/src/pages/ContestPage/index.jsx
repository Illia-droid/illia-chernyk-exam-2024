import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import Header from '../../components/Header';
import ContestSideBar from '../../components/ContestSideBar';
import OfferBox from '../../components/OfferBox';
import OfferForm from '../../components/OfferForm';
import Brief from '../../components/Brief';
import Spinner from '../../components/Spinner';
import TryAgain from '../../components/TryAgain';
import Error from '../../components/Error';
import OptionButton from '../../components/OptionButton';
import CONSTANTS from '../../constants';
import styles from './ContestPage.module.scss';

const {
  CONTEST_STATUS_ACTIVE,
  OFFER_STATUS: { PENDING, MODERATION },
  publicURL,
  CREATOR,
  CUSTOMER,
} = CONSTANTS;

const buttons = [
  { label: 'Brief', isActive: true },
  { label: 'Offer', isActive: false },
];

const ContestPage = ({ match }) => {
  const dispatch = useDispatch();
  const { contestByIdStore, userStore } = useSelector((state) => state);
  const { role } = userStore.data;
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;

  const getData = () => {
    const { params } = match;
    dispatch(getContestById({ contestId: params.id }));
  };

  useEffect(() => {
    getData();
    return () => {
      dispatch(changeEditContest(false));
    }; //eslint-disable-next-line
  }, [dispatch]);

  const clearError = () => dispatch(clearSetOfferStatusError());
  const handleChangeContestViewMode = (data) =>
    dispatch(changeContestViewMode(data));
  const closeImage = () =>
    dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }));

  const handleSetOfferStatus = (creatorId, offerId, command) => {
    clearError();
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    dispatch(setOfferStatus(obj));
  };

  const setOffersList = () => {
    if (offers.length === 0) {
      return (
        <div className={styles.notFound}>
          There is no suggestion at this moment
        </div>
      );
    }

    const filteredOffers =
      role === CUSTOMER
        ? offers.filter((offer) => offer.status !== MODERATION)
        : offers;

    return filteredOffers.map((offer) => (
      <OfferBox
        data={offer}
        key={offer.id}
        needButtons={needButtons}
        setOfferStatus={handleSetOfferStatus}
        contestType={contestData.contestType}
      />
    ));
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const userId = userStore.data.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONTEST_STATUS_ACTIVE &&
      offerStatus === PENDING
    );
  };

  const renderButtons = ({ label, isActive }) => (
    <OptionButton
      key={label}
      isActive={handleChangeContestViewMode}
      label={label}
      onClick={() => handleChangeContestViewMode(isActive)}
      className={classNames(styles.button, {
        [styles.activeButton]: isActive ? isBrief : !isBrief,
      })}
    />
  );

  return (
    <>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${publicURL}${imagePath}`}
          onCloseRequest={closeImage}
        />
      )}
      <Header />
      {error ? (
        <section className={styles.tryContainer}>
          <TryAgain getData={getData} />
        </section>
      ) : isFetching ? (
        <Spinner />
      ) : (
        <main className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <aside className={styles.buttonsContainer}>
              {buttons.map(renderButtons)}
            </aside>
            {isBrief ? (
              <Brief contestData={contestData} role={role} />
            ) : (
              <section className={styles.offersContainer}>
                {role === CREATOR &&
                  contestData.status === CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearError}
                  />
                )}
                <section className={styles.offers}>{setOffersList()}</section>
              </section>
            )}
          </div>
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </main>
      )}
    </>
  );
};

export default ContestPage;
