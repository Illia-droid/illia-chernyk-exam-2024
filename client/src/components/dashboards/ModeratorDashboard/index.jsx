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
    <>
      {isFetching && <Spinner />}

      <div>
        <button
          disabled={page === 1 || isFetching}
          onClick={handlePreviousPage}
        >
          Prev
        </button>
        <span>
          Page {page} from {totalPages || defaultPage}
        </span>
        <button
          disabled={page === totalPages || isFetching}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      <div>{!isFetching && offers && offers.map(renderOffers)}</div>
    </>
  );
};

export default ModeratorDashboard;
