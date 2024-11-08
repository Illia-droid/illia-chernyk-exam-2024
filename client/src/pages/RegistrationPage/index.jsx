import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAuthError } from '../../store/slices/authSlice';
import Logo from '../../components/Logo';
import RegistrationForm from '../../components/RegistrationForm';
import CONSTANTS from '../../constants';
import styles from './RegistrationPage.module.sass';
import data from './data.json';

const { CONTACT_PHONE, STATIC_IMAGES_PATH } = CONSTANTS;

const RegistrationPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const renderFAQs = () =>
    data.faq.map((item, i) => (
      <section key={i}>
        <h3 className={styles.headerArticle}>{item.question}</h3>
        <p className={styles.article}>
          {item.answer.replace('PHONE_NUMBER', CONTACT_PHONE)}
        </p>
      </section>
    ));
  return (
    <main className={styles.signUpPage}>
      <section className={styles.signUpContainer}>
        <header className={styles.headerSignUpPage}>
          <Logo src={`${STATIC_IMAGES_PATH}logo.png`} />
          <nav className={styles.linkLoginContainer}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <span>Login</span>
            </Link>
          </nav>
        </header>
        <RegistrationForm history={props.history} />
      </section>
      <footer className={styles.footer}>
        <div className={styles.articlesMainContainer}>
          <div className={styles.ColumnContainer}>
            <h2 className={styles.headerArticle}>{data.header.title}</h2>
            {data.header.content.map((paragraph, index) => (
              <p key={index} className={styles.article}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className={styles.ColumnContainer}>{renderFAQs()}</div>
        </div>
      </footer>
    </main>
  );
};

export default RegistrationPage;
