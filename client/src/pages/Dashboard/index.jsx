import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import CustomerDashboard from '../../components/CustomerDashboard/';
import CreatorDashboard from '../../components/CreatorDashboard/';
import CONSTANTS from '../../constants';

const { CUSTOMER, CREATOR } = CONSTANTS;

const Dashboard = ({ history, match }) => {
  const { role } = useSelector((state) => state.userStore.data);
  return (
    <>
      <Header />
      {role === CUSTOMER && (
        <CustomerDashboard history={history} match={match} />
      )}
      {role === CREATOR && <CreatorDashboard history={history} match={match} />}
    </>
  );
};

export default Dashboard;
