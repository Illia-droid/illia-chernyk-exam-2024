import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import ContestsContainer from '../ContestsContainer';
import TryAgain from '../TryAgain';
import CONSTANTS from '../../constants';
import styles from './CustomerDashboard.module.scss';

const {
  CUSTOMER,
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
} = CONSTANTS;

const CustomerDashboard = ({ history }) => {
  const dispatch = useDispatch();
  const { customerFilter, error, haveMore, isFetching } = useSelector(
    (state) => state.contestsList
  );
  useEffect(() => {
    getContestList();
    return () => {
      dispatch(clearContestsList());
    }; //eslint-disable-next-line
  }, [customerFilter]);

  const getContestList = (startFrom) => {
    dispatch(
      getContests({
        requestData: {
          limit: 8,
          offset: startFrom,
          contestStatus: customerFilter,
        },
        role: CUSTOMER,
      })
    );
  };

  const tryToGetContest = () => {
    dispatch(clearContestsList());
    getContestList();
  };

  const renderFilter = (filterStatus, filterLabel) => {
    const isActive = filterStatus === customerFilter;
    return (
      <button
        onClick={() => {
          if (!isActive) {
            dispatch(setNewCustomerFilter(filterStatus));
          }
        }}
        className={classNames(styles.button, {
          [styles.activeFilter]: isActive,
          [styles.filter]: !isActive,
        })}
      >
        {filterLabel}
      </button>
    );
  };

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.filterContainer}>
        {renderFilter(CONTEST_STATUS_ACTIVE, 'Active Contests')}
        {renderFilter(CONTEST_STATUS_FINISHED, 'Completed contests')}
        {renderFilter(CONTEST_STATUS_PENDING, 'Inactive contests')}
      </aside>
      {error ? (
        <TryAgain getData={tryToGetContest()} />
      ) : (
        <ContestsContainer
          isFetching={isFetching}
          loadMore={getContestList}
          history={history}
          haveMore={haveMore}
        />
      )}
    </main>
  );
};

export default CustomerDashboard;
