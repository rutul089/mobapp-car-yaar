import {types} from '../actions';

const initialState = {
  selectedLoanType: null,
};

const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECTED_LOAN_TYPE:
      return {...state, selectedLoanType: action.payload};

    case types.RESET_APP_STATE:
      return {...initialState};
    default:
      return state;
  }
};

export default loanReducer;
