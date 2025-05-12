import {types} from '../actions';

const initialState = {
  selectedVehicle: null, // For Get Vehicle By ID or by register number
  newVehicleData: null, // For New Vehicle Onboarding
  usedVehicleData: null, // For Used Vehicle Onboarding
  vehicleImages: [], // For vehicle image uploads
  vehiclePricing: {}, // For storing price info
  vehicleExists: false, // For Check Vehicle Exists
  loading: false,
  error: null,
  allVehicles: {
    data: [], // For Get All Vehicles
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    loading: false,
    error: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_VEHICLES_REQUEST:
      return {
        ...state,
        allVehicles: {
          ...state.allVehicles,
          error: null,
        },
        loading: true,
      };
    case types.FETCH_VEHICLES_SUCCESS:
      return {
        ...state,
        allVehicles: {
          data:
            action.payload.page === 1
              ? action.payload.data // If it's the first page, overwrite data
              : [...state.allVehicles.data, ...action.payload.data], // If it's not, append data
          pagination: {
            ...state.allVehicles.pagination,
            ...action.payload.pagination,
          },
          loading: false,
          error: null,
        },
        loading: false,
      };

    case types.FETCH_VEHICLES_FAILURE:
      return {
        ...state,
        allVehicles: {
          ...state.allVehicles,
          loading: false,
          error: action.payload,
        },
        loading: false,
      };

    case types.RESET_APP_STATE:
      return {...initialState};
    default:
      return state;
  }
};

export default authReducer;
