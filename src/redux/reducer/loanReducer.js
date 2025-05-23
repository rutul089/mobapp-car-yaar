import {types} from '../actions';
import {
  CLEAR_SEARCH_APPLICATION,
  FETCH_LOAN_APPLICATIONS,
  RESET_LOAN_APPLICATION,
  FETCH_LOAN_APP_BY_ID,
} from '../actions/actionType';

const initialState = {
  selectedLoanType: null,
  applications: [], // List
  loanApplicationStats: {}, // Status stats
  loanApplicationOverview: {}, // Overview view
  searchApplications: [], // For Get all Search application
  selectedLoanApplication: null, // Single view
  selectedApplicationId: null,
  totalPage: 1,
  page: 1,
  searchPage: 1,
  searchTotalPages: 1,
  loading: false,
  error: null,
  isCreatingLoanApplication: false,
};

const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECTED_LOAN_TYPE:
      return {...state, selectedLoanType: action.payload};

    case FETCH_LOAN_APPLICATIONS.REQUEST:
    case FETCH_LOAN_APP_BY_ID.REQUEST:
      return {...state, loading: true};

    case FETCH_LOAN_APPLICATIONS.FAILURE:
    case FETCH_LOAN_APP_BY_ID.FAILURE:
      return {...state, loading: false};

    case CLEAR_SEARCH_APPLICATION.SUCCESS:
      return {
        ...state,
        searchApplications: [],
        searchPage: 1,
        searchTotalPages: 1,
        loading: false,
      };

    case FETCH_LOAN_APPLICATIONS.SUCCESS:
      const {
        applications,
        pagination: {page, totalPages},
        isSearch,
      } = action.payload;

      if (isSearch) {
        return {
          ...state,
          loading: false,
          searchApplications:
            page > 1
              ? [...state.searchApplications, ...applications]
              : applications,
          searchPage: page,
          searchTotalPages: totalPages,
        };
      } else {
        return {
          ...state,
          loading: false,
          applications:
            page > 1 ? [...state.applications, ...applications] : applications,
          page,
          totalPage: totalPages,
        };
      }

    case FETCH_LOAN_APP_BY_ID.SUCCESS:
      return {
        ...state,
        loading: false,
        selectedLoanApplication: action.payload,
        selectedApplicationId: action.payload?.id,
      };

    case RESET_LOAN_APPLICATION.SUCCESS:
      return {
        ...state,
        selectedLoanApplication: null,
        selectedApplicationId: null,
      };

    case types.SET_IS_CREATING_LOAN_APPLICATION:
      return {
        ...state,
        isCreatingLoanApplication: action.payload,
      };

    case types.APPEND_NEW_LOAN_APPLICATION: {
      const exists = state.applications.some(
        app => app.id === action.payload.id,
      );

      return {
        ...state,
        applications: exists
          ? state.applications
          : [action.payload, ...state.applications],
      };
    }

    case types.RESET_APP_STATE:
      return {...initialState};
    default:
      return state;
  }
};

export default loanReducer;
