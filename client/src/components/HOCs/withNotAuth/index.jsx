import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../store/slices/userSlice';
import Spinner from '../../Spinner';

const withNotAuth = (Component) => {
  return ({ history }) => {
    const { isFetching, data } = useSelector((state) => state.userStore);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUser(history.replace)); //eslint-disable-next-line
    }, []);

    return (
      <>
        {isFetching && <Spinner />}
        {!data && <Component history={history} />}
      </>
    );
  };
};

export default withNotAuth;
