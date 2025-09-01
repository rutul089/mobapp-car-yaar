import {applicationStatus} from '../../constants/enums';
import {types} from '../actions';
import {
  ADD_REFERENCE,
  CLEAR_SEARCH_APPLICATION,
  CUSTOMER_FINANCE_DETAILS,
  CUSTOMER_FINANCE_DOCUMENT,
  FETCH_LOAN_APP_BY_ID,
  FETCH_LOAN_APPLICATIONS,
  RESET_LOAN_APPLICATION,
  DELETE_LOAN_APPLICATION,
  SUBMIT_LOAN_APPLICATION,
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
  financeDetails: null,
  financeDocuments: null,
  referenceDetail: null,
  isReadOnlyLoanApplication: false,
};

const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECTED_LOAN_TYPE:
      return {...state, selectedLoanType: action.payload};

    case FETCH_LOAN_APPLICATIONS.REQUEST:
    case CUSTOMER_FINANCE_DETAILS.REQUEST:
    case FETCH_LOAN_APP_BY_ID.REQUEST:
    case CUSTOMER_FINANCE_DOCUMENT.REQUEST:
    case ADD_REFERENCE.REQUEST:
    case SUBMIT_LOAN_APPLICATION.REQUEST:
      return {...state, loading: true};

    case FETCH_LOAN_APPLICATIONS.FAILURE:
    case FETCH_LOAN_APP_BY_ID.FAILURE:
    case CUSTOMER_FINANCE_DETAILS.FAILURE:
    case CUSTOMER_FINANCE_DOCUMENT.FAILURE:
    case ADD_REFERENCE.FAILURE:
    case DELETE_LOAN_APPLICATION.FAILURE:
    case DELETE_LOAN_APPLICATION.REQUEST:
    case SUBMIT_LOAN_APPLICATION.FAILURE:
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
        isReadOnlyLoanApplication: ![
          applicationStatus.DRAFT,
          applicationStatus.QUERY,
        ].includes(action.payload?.status),
      };

    case RESET_LOAN_APPLICATION.SUCCESS:
      return {
        ...state,
        selectedLoanApplication: null,
        selectedApplicationId: null,
        isReadOnlyLoanApplication: false,
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

    case CUSTOMER_FINANCE_DETAILS.SUCCESS:
      return {
        ...state,
        loading: false,
        financeDetails: action.payload,
      };

    case CUSTOMER_FINANCE_DOCUMENT.SUCCESS:
      return {
        ...state,
        loading: false,
        financeDocuments: action.payload,
      };

    case ADD_REFERENCE.SUCCESS:
      return {
        ...state,
        loading: false,
        referenceDetail: action.payload,
      };

    case DELETE_LOAN_APPLICATION.SUCCESS: {
      const deletedId = action.payload?.id;

      return {
        ...state,
        loading: false,
        applications: state.applications.filter(app => app.id !== deletedId),
        searchApplications: state.searchApplications.filter(
          app => app.id !== deletedId,
        ),
        selectedLoanApplication:
          state.selectedApplicationId === deletedId
            ? null
            : state.selectedLoanApplication,
        selectedApplicationId:
          state.selectedApplicationId === deletedId
            ? null
            : state.selectedApplicationId,
      };
    }

    case SUBMIT_LOAN_APPLICATION.SUCCESS:
      return {...state, loading: false};

    case types.RESET_APP_STATE:
      return {...initialState};
    default:
      return state;
  }
};

export default loanReducer;
