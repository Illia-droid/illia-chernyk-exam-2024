import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

const CustomerDashboard = (props) => {
  useEffect(() => {
    getContests();
    return () => {
      props.clearContestsList();
    }; //eslint-disable-next-line
  }, [props.customerFilter]);

  const loadMore = (startFrom) => {
    props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: props.customerFilter,
    });
  };

  const getContests = () => {
    props.getContests({
      limit: 8,
      contestStatus: props.customerFilter,
    });
  };

  const goToExtended = (contest_id) => {
    props.history.push(`/contest/${contest_id}`);
  };

  const setContestList = () => {
    return props.contests.map((contest) => (
      <ContestBox key={contest.id} data={contest} goToExtended={goToExtended} />
    ));
  };

  const tryToGetContest = () => {
    props.clearContestsList();
    getContests();
  };

  const renderFilter = (filterStatus, filterLabel) => {
    const isActive = filterStatus === props.customerFilter;
    return (
      <div
        onClick={() => {
          if (!isActive) {
            props.newFilter(filterStatus);
          }
        }}
        className={classNames({
          [styles.activeFilter]: isActive,
          [styles.filter]: !isActive,
        })}
      >
        {filterLabel}
      </div>
    );
  };

  const { error, haveMore } = props;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        {renderFilter(CONSTANTS.CONTEST_STATUS_ACTIVE, 'Active Contests')}
        {renderFilter(CONSTANTS.CONTEST_STATUS_FINISHED, 'Completed contests')}
        {renderFilter(CONSTANTS.CONTEST_STATUS_PENDING, 'Inactive contests')}
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest()} />
        ) : (
          <ContestsContainer
            isFetching={props.isFetching}
            loadMore={loadMore}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
