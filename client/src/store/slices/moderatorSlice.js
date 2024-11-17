import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import {
  createExtraReducers,
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const MODERATOR_SLICE_NAME = 'moderator';

const initialState = {
  isFetching: false,
  error: null,
  offers: [],
  currentPage: 1,
  totalPages: 1,
};

//---------- getAllOffers
export const getAllOffers = decorateAsyncThunk({
  key: `${MODERATOR_SLICE_NAME}/getAllOffers`,
  thunk: async ({ page, limit }) => {
    const { data } = await restController.getAllOffers({ page, limit });
    return data;
  },
});

const getAllOffersExtraReducers = createExtraReducers({
  thunk: getAllOffers,
  pendingReducer,
  fulfilledReducer: (state, { payload }) => {
    state.isFetching = false;
    state.offers = payload.offers;
    state.totalPages = payload.totalPages;
  },
  rejectedReducer,
});

//---------- setModerationOfferStatus
export const setModerationOfferStatus = decorateAsyncThunk({
  key: `${MODERATOR_SLICE_NAME}/setModerationOfferStatus`,
  thunk: async (payload) => {
    console.log(payload);

    const { data } = await restController.setModerationOfferStatus(payload);
    await restController.sendEmail(payload);
    return data;
  },
});

const setModerationOfferStatusExtraReducers = createExtraReducers({
  thunk: setModerationOfferStatus,
  pendingReducer,
  fulfilledReducer: (state, { payload }) => {
    state.isFetching = false;

    if (payload.status === 'successful') {
      state.offers.map((offer) =>
        offer.id === payload.id ? { ...offer, status: 'pending' } : offer
      );
    }
    state.offers = state.offers.filter((offer) => offer.id !== payload.id);
  },
  rejectedReducer,
});

const reducers = {
  cleanAllOffers: (state) => {
    state.error = null;
    state.offers = [];
  },
  setPage: (state, { payload }) => {
    state.currentPage = payload;
  },
};

const extraReducers = (builder) => {
  getAllOffersExtraReducers(builder);
  setModerationOfferStatusExtraReducers(builder);
};

const contestSavingSlice = createSlice({
  name: MODERATOR_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestSavingSlice;

export const { cleanAllOffers, setPage } = actions;

export default reducer;
