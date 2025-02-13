import axios from 'axios';
import Cookies from 'js-cookie';
import CONTANTS from '../constants';
import history from '../browserHistory';

const httpClient = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

let accessToken = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN) || null;

httpClient.interceptors.request.use(
  (config) => {
    const refreshToken = Cookies.get(CONTANTS.REFRESH_TOKEN);
    if (refreshToken && accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

httpClient.interceptors.response.use(
  (response) => {
    if (
      response &&
      response.data &&
      response.data.data &&
      response.data.data.tokenPair
    ) {
      const {
        data: {
          data: { tokenPair },
        },
      } = response;
      Cookies.set(CONTANTS.REFRESH_TOKEN, tokenPair.refresh);
      window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, tokenPair.access);
      accessToken = tokenPair.access;
    }
    return response;
  },
  (err) => {
    console.log(err);
    console.log('err.response.status', err.response.status);

    if (
      err.response.status === 401 &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/registration' &&
      history.location.pathname !== '/'
    ) {
      history.replace('/login');
      return;
    }
    const refreshToken = Cookies.get(CONTANTS.REFRESH_TOKEN);
    if (refreshToken && err.response.status === 408) {
      return httpClient
        .post('/auth/refresh', { refreshToken })
        .then(({ data }) => {
          const { tokenPair } = data.data;
          Cookies.set(CONTANTS.REFRESH_TOKEN, tokenPair.refresh);
          window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, tokenPair.access);
          accessToken = tokenPair.access;
          err.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios.request(err.config);
        });
    }
    return Promise.reject(err);
  }
);

export default httpClient;
