import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import Logo from '../Logo';
import Avatar from '../Avatar';
import CONSTANTS from '../../constants';
import styles from './Header.module.sass';
import navData from './navData.json';

const { STATIC_IMAGES_PATH, CONTACT_PHONE, CREATOR } = CONSTANTS;

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector((state) => state.userStore);
  const { nav, user, notAuthUser } = navData;

  useEffect(() => {
    if (!data) {
      dispatch(getUser());
    } //eslint-disable-next-line
  }, []);

  const logOut = () => {
    localStorage.clear();
    dispatch(clearUserStore());
    history.replace('/login');
  };

  const startContests = () => {
    history.push('/startContest');
  };

  const renderLoginButtons = () =>
    data ? (
      <>
        <div className={styles.userInfo}>
          <Avatar avatar={data.avatar} />
          <span>{`Hi, ${data.displayName}`}</span>
          <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
          <ul>
            {user.map(({ name, url }, i) => (
              <li key={i}>
                <Link to={url} style={{ textDecoration: 'none' }}>
                  <span>{name}</span>
                </Link>
              </li>
            ))}
            <li>
              <span onClick={logOut}>Logout</span>
            </li>
          </ul>
        </div>
        <img
          src={`${STATIC_IMAGES_PATH}email.png`}
          className={styles.emailIcon}
          alt="email"
        />
      </>
    ) : (
      <>
        {notAuthUser.map(({ name, url }, i) => (
          <Link key={i} to={url} style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>{name}</span>
          </Link>
        ))}
      </>
    );
  const renderNavMenu = () => (
    <nav className={styles.nav}>
      <ul>
        {nav.map((menuItem, i) => (
          <li key={i}>
            <span>{menuItem.title}</span>
            <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
            <ul>
              {menuItem.links.map((link, i) => (
                <li key={i} className={link.last ? styles.last : null}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isFetching) {
    return null;
  }
  return (
    <header className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <a href={`tel:${CONTACT_PHONE}`}>
            <img src={`${STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>{`${CONTACT_PHONE}`}</span>
          </a>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Logo
          src={`${STATIC_IMAGES_PATH}blue-logo.png`}
          className={styles.logo}
          alt="blue_logo"
        />
        <div className={styles.leftNav}>
          {renderNavMenu()}
          {data && data.role !== CREATOR && (
            <button className={styles.startContestBtn} onClick={startContests}>
              START CONTEST
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);