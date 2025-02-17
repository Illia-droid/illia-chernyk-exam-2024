import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner';
import styles from './ContestContainer.module.scss';
import ContestBox from './ContestBox';

const ContestsContainer = ({ isFetching, loadMore, haveMore, history }) => {
  const { contests } = useSelector((state) => state.contestsList);
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && haveMore && !isFetching) {
          loadMore(contests.length);
        }
      },
      { threshold: 1.0 }
    );
    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    }; //eslint-disable-next-line
  }, [contests.length, haveMore, loadMore]);

  return (
    <section className={styles.contestsContainer}>
      {isFetching && <Spinner />}
      {!isFetching && contests.length === 0 && (
        <div className={styles.notFound}>Nothing found</div>
      )}
      {contests.map((contest) => (
        <ContestBox key={contest.id} data={contest} history={history} />
      ))}
      <div ref={observerRef}></div>
    </section>
  );
};

export default ContestsContainer;
