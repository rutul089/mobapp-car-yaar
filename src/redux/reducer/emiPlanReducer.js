import {types} from '../actions';
import {EMI_PLAN} from '../actions/actionType';

const initialState = {
  emiPlanData: null,
};

const emiPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMI_PLAN.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EMI_PLAN.SUCCESS:
      return {
        ...state,
        emiPlanData: action.payload,
        loading: false,
      };

    case EMI_PLAN.FAILURE:
      return {
        ...state,
        loading: false,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default emiPlanReducer;
