import {types} from '../actions';
import {
  CLEAR_SEARCH_APPLICATION,
  FETCH_LOAN_APPLICATIONS,
  RESET_LOAN_APPLICATION,
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
};

const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECTED_LOAN_TYPE:
      return {...state, selectedLoanType: action.payload};

    case FETCH_LOAN_APPLICATIONS.REQUEST:
      return {...state, loading: true};

    case FETCH_LOAN_APPLICATIONS.FAILURE:
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

    case RESET_LOAN_APPLICATION.SUCCESS:
      return {
        ...state,
        selectedLoanApplication: null,
        selectedApplicationId: null,
      };

    case types.RESET_APP_STATE:
      return {...initialState};
    default:
      return state;
  }
};

export default loanReducer;
