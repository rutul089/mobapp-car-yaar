import {types} from '../actions';
import {VEHICLE_BY_ID} from '../actions/actionType';

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
  },
  totalPage: 1,
  page: 1,
  searchVehicles: [], // For Get all Search Vehicle
  searchPage: 1,
  searchTotalPages: 1,
};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_VEHICLES_REQUEST:
    case VEHICLE_BY_ID.REQUEST:
      return {
        ...state,
        loading: true,
      };

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
        },
        totalPage: action.payload.totalPages,
        page: action.payload.page,
        loading: false,
      };

    case types.FETCH_VEHICLES_FAILURE:
    case types.STOP_LOADING:
    case VEHICLE_BY_ID.FAILURE:
    case types.SEARCH_VEHICLES_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case types.SEARCH_VEHICLES_SUCCESS:
      return {
        ...state,
        searchVehicles:
          action.payload.page === 1
            ? action.payload.data
            : [...state.searchVehicles, ...action.payload.data],
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        searchPage: action.payload.page,
        searchTotalPages: action.payload.totalPages,
      };

    case VEHICLE_BY_ID.SUCCESS:
      return {
        ...state,
        selectedVehicle: action.payload,
        loading: false,
      };

    case types.CLEAR_VEHICLE_SEARCH:
      return {
        ...state,
        searchVehicles: [],
        searchPage: 1,
        searchTotalPages: 1,
        loading: false,
      };

    case types.RESET_APP_STATE:
      return {...initialState};
    default:
      return state;
  }
};

export default vehicleReducer;
