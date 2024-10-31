import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner/Spinner';

const withAuth = (Component) => {
  return (props) => {
    const { history, match } = props;
    const { isFetching, data } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();

    useEffect(() => {
      if (!data) {
        dispatch(getUser(history.push('/login')));
      } //eslint-disable-next-line
    }, []);

    return (
      <>
        {isFetching && <Spinner />}
        {data && <Component history={history} match={match} {...props} />}
      </>
    );
  };
};

export default withAuth;
