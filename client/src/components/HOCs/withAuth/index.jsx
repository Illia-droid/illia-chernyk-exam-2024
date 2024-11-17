import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner';

const withAuth = (Component, additionalProps) => {
  return (props) => {
    const { history, match } = props;
    const { isFetching, data } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!data) {
        dispatch(getUser());
      }
      if (!isFetching && !data) {
        history.push('/login');
      }
      //eslint-disable-next-line
    }, [data]);

    return (
      <>
        {isFetching && <Spinner />}
        {data && (
          <Component
            history={history}
            match={match}
            {...props}
            {...additionalProps}
          />
        )}
      </>
    );
  };
};

export default withAuth;
