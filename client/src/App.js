import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withAuth, withNotAuth } from './components/HOCs';
import NotFound from './components/NotFound';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer';
import RegistrationPage from './pages/RegistrationPage';
import Payment from './pages/Payment';
import StartContestPage from './pages/StartContestPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ContestPage from './pages/ContestPage';
import UserProfile from './pages/UserProfile';
import ContestCreationPage from './pages/ContestCreationPage';
import CONSTANTS from './constants';
import './App.css';

const { NAME_CONTEST, TAGLINE_CONTEST, LOGO_CONTEST } = CONSTANTS;

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={withNotAuth(LoginPage)} />
        <Route
          exact
          path="/registration"
          component={withNotAuth(RegistrationPage)}
        />
        <Route exact path="/payment" component={withAuth(Payment)} />
        <Route
          exact
          path="/startContest"
          component={withAuth(StartContestPage)}
        />
        <Route
          exact
          path="/startContest/nameContest"
          component={withAuth(ContestCreationPage, {
            contestType: NAME_CONTEST,
            title: 'Company Name',
          })}
        />
        <Route
          exact
          path="/startContest/taglineContest"
          component={withAuth(ContestCreationPage, {
            contestType: TAGLINE_CONTEST,
            title: 'TAGLINE',
          })}
        />
        <Route
          exact
          path="/startContest/logoContest"
          component={withAuth(ContestCreationPage, {
            contestType: LOGO_CONTEST,
            title: 'LOGO',
          })}
        />
        <Route exact path="/dashboard" component={withAuth(Dashboard)} />
        <Route exact path="/contest/:id" component={withAuth(ContestPage)} />
        <Route exact path="/account" component={withAuth(UserProfile)} />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </BrowserRouter>
  );
};

export default App;
