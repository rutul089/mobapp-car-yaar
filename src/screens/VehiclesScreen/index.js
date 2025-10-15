import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import {
  clearVehicleSearch,
  fetchVehiclesThunk,
  searchVehiclesByKeywordThunk,
  resetSelectedVehicle,
  selectedLoanType,
} from '../../redux/actions';
import Vehicles_Component from './Vehicles_Component';
import {
  API_TRIGGER,
  loanType,
  vehicleFilterOption,
} from '../../constants/enums';
import debounce from 'lodash.debounce';
import {Alert} from 'react-native';

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      apiTrigger: API_TRIGGER.DEFAULT,
      isSearch: false,
      searchText: '',
      fullScreen: false,
      stopLoading: false,
      showFilterVehicles: false,
      activeFilterOption: '',
      previousSearch: '',
    };
    this.limit = 10;
    this.debouncedSearch = debounce(this.searchFromAPI, 500);
  }

  componentDidMount() {
    let navState = getScreenParam(this.props.route, 'params');
    this.setState({
      fullScreen: navState?.fullScreen,
    });
    this.fetchVehicles();
  }

  /**
   * Fetch vehicles list for a given page
   * @param {number} [page=1]
   */
  fetchVehicles = (page = 1, payload = {}) => {
    this.props.fetchVehiclesThunk(page, this.limit, payload).finally(() => {
      this.setState({refreshing: false, apiTrigger: API_TRIGGER.DEFAULT});
    });
  };

  /**
   * Handles loading more vehicles during pagination
   */
  handleLoadMore = () => {
    const {loading} = this.props;
    const {isSearch, searchText, activeFilterOption} = this.state;

    if (loading) {
      return;
    }

    const [currentPage, totalPages] = this.getPageInfo();
    if (currentPage >= totalPages) {
      return;
    }

    const nextPage = currentPage + 1;
    this.setState({apiTrigger: API_TRIGGER.LOAD_MORE});

    let payload = {
      params: {
        isDraft: activeFilterOption === vehicleFilterOption.DRAFT,
      },
    };

    if (isSearch) {
      this.props
        .searchVehiclesByKeywordThunk(searchText.trim(), nextPage, this.limit)
        .finally(() => this.setState({apiTrigger: API_TRIGGER.DEFAULT}));
    } else {
      this.fetchVehicles(nextPage, activeFilterOption ? payload : {});
    }
  };

  /**
   * Navigates to vehicle detail screen when card is clicked
   */
  onWrapperClick = item => {
    const {fullScreen} = this.state;

    this.props.resetSelectedVehicle();

    if (!fullScreen) {
      this.props.selectedLoanType(loanType.addVehicle);
    }

    if (fullScreen && item?.hasActiveLoan) {
      Alert.alert(
        'Vehicle Not Available',
        'This vehicle already has an active loan. You cannot assign it to another customer.',
        [{text: 'OK'}],
      );
      return;
    }

    navigate(ScreenNames.VehicleDetail, {
      vehicleId: item?.UsedVehicle?.vehicleId,
    });
  };

  /**
   * Handles pull-to-refresh behavior
   */
  pullToRefresh = async () => {
    this.setState({
      refreshing: true,
      searchText: '',
      isSearch: false,
      apiTrigger: API_TRIGGER.PULL_TO_REFRESH,
      activeFilterOption: '',
    });

    this.props.clearVehicleSearch();
    await this.fetchVehicles();
  };

  /**
   * Returns current page and total pages based on whether search is active
   * @returns {[number, number]}
   */
  getPageInfo = () => {
    const {page, totalPage, searchPage, searchTotalPages} = this.props;
    const {isSearch} = this.state;

    return isSearch ? [searchPage, searchTotalPages] : [page, totalPage];
  };

  /**
   * Handles search input change
   * @param {string} text
   */
  // onSearchText = text => {
  //   const trimmed = text.trim();
  //   this.setState({searchText: text, apiTrigger: API_TRIGGER.DEFAULT}, () => {
  //     if (trimmed === '') {
  //       this.setState({isSearch: false});
  //       this.fetchVehicles();
  //       this.props.clearVehicleSearch();
  //     } else {
  //       this.setState({stopLoading: true});
  //       this.searchFromAPI(trimmed);
  //     }
  //   });
  // };

  onSearchText = text => {
    const trimmed = text.trim();

    this.setState({searchText: text, apiTrigger: API_TRIGGER.DEFAULT}, () => {
      if (trimmed === '') {
        this.setState({isSearch: false, previousSearch: ''});
        this.props.clearVehicleSearch();
        this.fetchVehicles(); // fallback to default
        return;
      }

      if (trimmed !== this.state.previousSearch) {
        this.setState({stopLoading: true, previousSearch: trimmed});
        this.debouncedSearch(trimmed);
      }
    });
  };

  /**
   * Clears search input and results
   */
  clearSearch = () => {
    this.setState({searchText: '', isSearch: false});
    this.props.clearVehicleSearch();
  };

  /**
   * Triggers search API based on input text
   * @param {string} text
   */
  searchFromAPI = text => {
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      this.setState({isSearch: false});
      return;
    }

    this.setState({
      isSearch: true,
      apiTrigger: API_TRIGGER.DEFAULT,
      activeFilterOption: '',
    });
    this.props
      .searchVehiclesByKeywordThunk(trimmed, 1, this.limit)
      .finally(() =>
        this.setState({
          refreshing: false,
          apiTrigger: API_TRIGGER.DEFAULT,
          stopLoading: false,
        }),
      );
  };

  /**
   * Navigate to Search Vehicle Number screen
   */
  onAddButtonPress = () => {
    navigate(ScreenNames.SearchView);
  };

  handleFilterVehicles = () => {
    this.setState({showFilterVehicles: true});
  };

  onPressPrimaryButton = value => {
    this.setState({
      showFilterVehicles: false,
      activeFilterOption: value,
    });
  };

  onClearFilterButton = () => {
    this.setState({
      showFilterVehicles: false,
      activeFilterOption: '',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {activeFilterOption, isSearch, searchText} = this.state;

    // Run filter fetch if activeFilterOption changes and it's not a search
    if (prevState.activeFilterOption !== activeFilterOption && !isSearch) {
      let payload = {};
      if (
        [vehicleFilterOption.DRAFT, vehicleFilterOption.SAVED].includes(
          activeFilterOption,
        )
      ) {
        payload = {
          params: {
            isDraft: activeFilterOption === vehicleFilterOption.DRAFT,
          },
        };
      }

      this.fetchVehicles(1, payload);
    }
  }

  render() {
    const {
      loading,
      vehicleList,
      searchVehicles,
      isCreatingLoanApplication,
      userData,
    } = this.props;

    const {
      refreshing,
      apiTrigger,
      searchText,
      isSearch,
      stopLoading,
      showFilterVehicles,
      activeFilterOption,
    } = this.state;

    const [currentPage, totalPages] = this.getPageInfo();

    const initialLoading =
      loading &&
      apiTrigger === API_TRIGGER.DEFAULT &&
      !refreshing &&
      !stopLoading;

    const vehiclesToShow = isSearch ? searchVehicles : vehicleList;

    console.log({loading, apiTrigger, refreshing, stopLoading});

    return (
      <Vehicles_Component
        vehicleData={vehiclesToShow}
        onWrapperClick={this.onWrapperClick}
        loading={initialLoading}
        handleLoadMore={this.handleLoadMore}
        refreshing={refreshing}
        onRefresh={this.pullToRefresh}
        apiTrigger={apiTrigger}
        totalPages={totalPages}
        currentPage={currentPage}
        onSearchText={this.onSearchText}
        searchText={searchText}
        clearSearch={this.clearSearch}
        setSearch={this.searchFromAPI}
        onAddButtonPress={this.onAddButtonPress}
        isCreatingLoanApplication={isCreatingLoanApplication}
        profileImage={userData?.profileImage}
        handleFilterVehicles={this.handleFilterVehicles}
        filterVehicleProps={{
          isVisible: showFilterVehicles,
          handleCloseFilter: () => this.setState({showFilterVehicles: false}),
          onPressPrimaryButton: value => this.onPressPrimaryButton(value),
          onClearFilterButton: this.onClearFilterButton,
        }}
        activeFilterOption={activeFilterOption}
        stopLoading={stopLoading}
      />
    );
  }
}

const mapStateToProps = ({vehicleData, loanData, user}) => ({
  vehicleList: vehicleData?.allVehicles?.data,
  searchVehicles: vehicleData?.searchVehicles,
  page: vehicleData.page,
  totalPage: vehicleData.totalPage,
  searchPage: vehicleData.searchPage,
  searchTotalPages: vehicleData.searchTotalPages,
  loading: vehicleData?.loading,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  userData: user?.userProfile,
});

const mapDispatchToProps = {
  fetchVehiclesThunk,
  clearVehicleSearch,
  searchVehiclesByKeywordThunk,
  resetSelectedVehicle,
  selectedLoanType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Vehicles);
