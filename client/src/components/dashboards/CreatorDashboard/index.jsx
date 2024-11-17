import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../../store/slices/contestsSlice';
import { getDataForContest } from '../../../store/slices/dataForContestSlice';
import ContestsContainer from '../../ContestsContainer';
import TryAgain from '../../TryAgain';
import CONSTANTS from '../../../constants';
import styles from './CreatorDashboard.module.scss';
const { CREATOR } = CONSTANTS;

const types = [
  'Choose contest type',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];
const CreatorDashboard = ({ history, location }) => {
  const dispatch = useDispatch();
  const fetchContests = (data) =>
    dispatch(getContests({ requestData: data, role: CREATOR }));
  const { contests, creatorFilter, haveMore, error, isFetching } = useSelector(
    (state) => state.contestsList
  );
  const { data } = useSelector((state) => state.dataForContest);

  useEffect(() => {
    if (!data) {
      dispatch(getDataForContest());
    }
    if (parseUrlForParams(location.search) && !contests.length)
      getContestList(creatorFilter);
    return () => {
      dispatch(clearContestsList());
    }; //eslint-disable-next-line
  }, [location.search]);

  const renderSelectType = () => (
    <select
      onChange={({ target }) =>
        changePredicate({
          name: 'typeIndex',
          value: types.indexOf(target.value),
        })
      }
      value={types[creatorFilter.typeIndex]}
      className={styles.input}
    >
      {types.slice(1).map((el, i) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </select>
  );

  const renderIndustryType = () => {
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        <option value={''}>Choose industry</option>
        {data &&
          data.industry.map((item, index) => (
            <option key={index + 1} value={item}>
              {item}
            </option>
          ))}
      </select>
    );
  };

  const getContestList = (filter) => {
    fetchContests({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  const changePredicate = ({ name, value }) => {
    dispatch(
      setNewCreatorFilter({
        [name]: value === 'Choose industry' ? null : value,
      })
    );
    parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  const parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, creatorFilter)) {
      dispatch(setNewCreatorFilter(filter));
      dispatch(clearContestsList());
      getContestList(filter);
      return false;
    }
    return true;
  };

  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    fetchContests({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const tryLoadAgain = () => {
    dispatch(clearContestsList());
    fetchContests({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
                name: 'ownEntries',
                value: !creatorFilter.ownEntries,
              })
            }
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            {renderSelectType()}
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target }) =>
                changePredicate({
                  name: 'contestId',
                  value: target.value,
                })
              }
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {
            <div className={styles.inputContainer}>
              <span>By industry</span>
              {renderIndustryType()}
            </div>
          }
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </aside>
      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
      ) : (
        <ContestsContainer
          isFetching={isFetching}
          loadMore={loadMore}
          history={history}
          haveMore={haveMore}
        />
      )}
    </main>
  );
};

export default withRouter(CreatorDashboard);
