import http from '../interceptor';

export const registerRequest = (data) => http.post('auth/sign-up', data);
export const loginRequest = (data) => http.post('auth/sign-in', data);
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
export const downloadContestFile = (data) =>
  http.post(`downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('pay', data.formData);
export const getDialog = (data) => http.post('getChat', data);
export const dataForContest = (data) => http.post('dataForContest', data);
export const cashOut = (data) => http.post('cashout', data);
export const newMessage = (data) => http.post('newMessage', data);
export const getCatalogList = (data) => http.post('getCatalogs', data);
export const addChatToCatalog = (data) =>
  http.post('addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const deleteCatalog = (data) => http.post('deleteCatalog', data);
export const removeChatFromCatalog = (data) =>
  http.post('removeChatFromCatalog', data);
export const getCustomersContests = (data) =>
  http.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );
export const getActiveContests = (data) => http.post('getAllContests', data);
export const sendEmail = (data) =>
  http.post('sendEmail', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getUser = () => http.get('getUser');
export const getPreviewChat = () => http.get('getPreview');

export const updateContest = (data) =>
  http.patch('updateContest', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const changeMark = (data) => http.patch('changeMark', data);
export const updateUser = (data) =>
  http.patch('updateUser', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const changeChatFavorite = (data) => http.patch('favorite', data);
export const changeChatBlock = (data) => http.patch('blackList', data);
export const changeCatalogName = (data) =>
  http.patch('updateNameCatalog', data);
export const setModerationOfferStatus = (data) =>
  http.patch('setModerationOfferStatus', data);

export const getContestById = (data) =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
export const getAllOffers = ({ page, limit }) =>
  http.get(`getAllOffers`, { params: { page, limit } });
