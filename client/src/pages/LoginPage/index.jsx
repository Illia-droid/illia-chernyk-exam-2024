import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuthError } from '../../store/slices/authSlice';
import LoginForm from '../../components/LoginForm';
import Logo from '../../components/Logo';
import CONSTANTS from '../../constants';
import styles from './LoginPage.module.scss';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <header className={styles.headerSignUpPage}>
          <Logo src={`${STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          <nav className={styles.linkLoginContainer}>
            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <span>Signup</span>
            </Link>
          </nav>
        </header>
        <section className={styles.loginFormContainer}>
          <LoginForm history={history} />
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
