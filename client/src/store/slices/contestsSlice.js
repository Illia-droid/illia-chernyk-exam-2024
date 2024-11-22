import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import { decorateAsyncThunk, pendingReducer } from '../../utils/store';

const { CONTEST_STATUS_ACTIVE, CUSTOMER } = CONSTANTS;
const CONTESTS_SLICE_NAME = 'contests';

const initialState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: false,
};

export const getContests = decorateAsyncThunk({
  key: `${CONTESTS_SLICE_NAME}/getContests`,
  thunk: async ({ requestData, role }) => {
    const { data } =
      role === CUSTOMER
        ? await restController.getCustomersContests(requestData)
        : await restController.getActiveContests(requestData);
    return data;
  },
});

const reducers = {
  clearContestsList: (state) => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (state, { payload }) => ({
    ...initialState,
    customerFilter: payload,
    isFetching: false,
  }),
  setNewCreatorFilter: (state, { payload }) => ({
    ...initialState,
    creatorFilter: { ...state.creatorFilter, ...payload },
    isFetching: false,
  }),
};

const extraReducers = (builder) => {
  builder.addCase(getContests.pending, pendingReducer);
  builder.addCase(getContests.fulfilled, (state, { payload }) => {
    state.contests = [...state.contests, ...payload.contests];
    state.haveMore = payload.haveMore;
    state.isFetching = false;
  });
  builder.addCase(getContests.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.contests = [];
  });
};

const contestsSlice = createSlice({
  name: CONTESTS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestsSlice;

export const { clearContestsList, setNewCustomerFilter, setNewCreatorFilter } =
  actions;

export default reducer;
