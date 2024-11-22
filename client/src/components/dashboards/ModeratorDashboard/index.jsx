import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllOffers,
  cleanAllOffers,
  setPage,
  setModerationOfferStatus,
} from '../../../store/slices/moderatorSlice';
import Spinner from '../../Spinner';
import OfferBoxForModerator from '../../OfferBoxForModerator';
import styles from './ModeratorDashboard.module.scss';

const ModeratorDashboard = () => {
  const dispatch = useDispatch();
  const { totalPages, isFetching } = useSelector((state) => state.moderator);
  const offers = useSelector((state) => state.moderator.offers);
  const limit = 8;
  const defaultPage = 1;
  const [page, setCurrentPage] = useState(defaultPage);

  useEffect(() => {
    dispatch(getAllOffers({ page, limit }));
    return () => {
      dispatch(cleanAllOffers());
    };
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      dispatch(setPage(page));
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      dispatch(setPage(page));
    }
  };
  const handleModeratorStatus = ({ id, status, email }) => {
    dispatch(setModerationOfferStatus({ id, status, email }));
    if (offers.length === 1 && totalPages !== 1) {
      const previousPage = page > 1 ? page - 1 : 1;
      dispatch(getAllOffers({ page: previousPage, limit }));
      setCurrentPage(previousPage);
    }
  };

  const renderOffers = (offer) => (
    <OfferBoxForModerator
      data={offer}
      key={offer.id}
      handleModeratorStatus={handleModeratorStatus}
    />
  );

  return (
    <main className={styles.moderatorDashboard}>
      {isFetching && <Spinner />}

      <div className={styles.buttonsContainer}>
        <button
          disabled={page === 1 || isFetching}
          onClick={handlePreviousPage}
          className={styles.pageButton}
        >
          Prev
        </button>
        <span className={styles.info}>
          Page {page} from {totalPages || defaultPage}
        </span>
        <button
          disabled={page === totalPages || isFetching}
          onClick={handleNextPage}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
      {offers.length > 0 ? (
        offers.map(renderOffers)
      ) : (
        <p className={styles.info}>There is no offers yet</p>
      )}
    </main>
  );
};

export default ModeratorDashboard;
