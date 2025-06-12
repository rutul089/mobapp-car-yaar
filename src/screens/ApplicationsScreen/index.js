import React, {Component} from 'react';
import {connect} from 'react-redux';
import {API_TRIGGER} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {
  clearSearchApplication,
  fetchLoanApplicationsThunk,
  resetLoanApplication,
  setIsCreatingLoanApplication,
} from '../../redux/actions';
import Applications_Component from './Applications_Component';
import debounce from 'lodash.debounce';

/**
 * Screen that displays and manages a paginated and searchable list of loan applications.
 */
class ApplicationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Tracks how the API was triggered (e.g., refresh, search, load more)
      apiTrigger: API_TRIGGER.DEFAULT,
      refreshing: false,

      // Search-related state
      isSearch: false,
      searchText: '',

      // Optional full-screen view toggle (unused but reserved)
      fullScreen: false,
      stopLoading: false,
      showFilterApplications: false,
      activeFilterOption: '',
      previousSearch: '',
    };

    this.limit = 10; // Pagination limit
    this.onItemPress = this.onItemPress.bind(this);
    this.handleTrackApplication = this.handleTrackApplication.bind(this);
    this.debouncedSearch = debounce(this.searchFromAPI, 500);
  }

  /**
   * Initial data fetch on screen mount.
   */
  componentDidMount = () => {
    this.fetchAllApplication();
  };

  /**
   * Fetches all loan applications with optional page and filter params.
   * @param {number} page - Page number to fetch.
   * @param {Object} param - Optional params (e.g., search filters).
   */
  fetchAllApplication = (page = 1, param = {}) => {
    this.props
      .fetchLoanApplicationsThunk(page, this.limit, param)
      .finally(() => {
        this.setState({
          refreshing: false,
          apiTrigger: API_TRIGGER.DEFAULT,
          stopLoading: false,
        });
      });
  };

  /**
   * Pull-to-refresh handler that resets search and reloads data.
   */
  pullToRefresh = async () => {
    this.setState({
      refreshing: true,
      searchText: '',
      isSearch: false,
      apiTrigger: API_TRIGGER.PULL_TO_REFRESH,
      activeFilterOption: '',
    });

    this.props.clearSearchApplication();
    await this.fetchAllApplication();
  };

  /**
   * Handles infinite scroll logic to fetch the next page.
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

    let payload = {};

    if (activeFilterOption) {
      payload = {
        params: {
          status: activeFilterOption,
        },
      };
    }

    if (isSearch) {
      this.fetchAllApplication(nextPage, {params: {search: searchText.trim()}});
    } else {
      this.fetchAllApplication(nextPage, payload);
    }
  };

  /**
   * Handles real-time updates to the search input.
   * Clears search if text is empty.
   * @param {string} value - Input text.
   */
  // onSearchText = value => {
  //   const trimmed = value.trim();
  //   this.setState({searchText: value, apiTrigger: API_TRIGGER.DEFAULT}, () => {
  //     if (trimmed === '') {
  //       this.setState({isSearch: false});
  //       this.props.clearSearchApplication();
  //     } else {
  //       this.setState({stopLoading: true});
  //       this.searchFromAPI(value);
  //     }
  //   });
  // };

  onSearchText = text => {
    const trimmed = text.trim();

    this.setState({searchText: text, apiTrigger: API_TRIGGER.DEFAULT}, () => {
      if (trimmed === '') {
        this.setState({isSearch: false, previousSearch: ''});
        this.props.clearSearchApplication();
        this.fetchAllApplication(); // fallback to default
        return;
      }

      if (trimmed !== this.state.previousSearch) {
        this.setState({stopLoading: true, previousSearch: trimmed});
        this.debouncedSearch(trimmed);
      }
    });
  };

  /**
   * Clears the current search input and resets list to default state.
   */
  clearSearch = () => {
    this.setState({searchText: '', isSearch: false});
    this.props.clearSearchApplication();
  };

  /**
   * Initiates a search from the API using the given search text.
   * @param {string} text - Search keyword.
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
    this.fetchAllApplication(1, {params: {search: trimmed}});
  };

  /**
   * Navigates to the Loan Detail screen.
   * @param {Object} item - Selected loan application item.
   */
  onItemPress = item => {
    this.props.resetLoanApplication();
    navigate(ScreenNames.ViewLoanDetail, {params: item});
  };

  /**
   * Navigates to the Track Application screen.
   * @param {Object} item - Selected loan application item.
   */
  handleTrackApplication = item => {
    navigate(ScreenNames.TrackApplication, {params: item});
  };

  /**
   * Retrieves current and total pages based on search state.
   * @returns {[number, number]} - [currentPage, totalPages]
   */
  getPageInfo = () => {
    const {page, totalPage, searchPage, searchTotalPages} = this.props;
    const {isSearch} = this.state;
    return isSearch ? [searchPage, searchTotalPages] : [page, totalPage];
  };

  handleFilterApplications = () => {
    this.setState({showFilterApplications: true});
  };

  onPressPrimaryButton = value => {
    this.setState(
      {
        showFilterApplications: false,
        activeFilterOption: value,
        isSearch: false,
        searchText: '',
      },
      () => this.clearSearch(),
    );
  };

  onClearFilterButton = () => {
    this.setState({
      showFilterApplications: false,
      activeFilterOption: '',
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {activeFilterOption, isSearch, searchText} = this.state;

    // Run filter fetch if activeFilterOption changes and it's not a search
    if (prevState.activeFilterOption !== activeFilterOption && !isSearch) {
      let payload = {};
      if (activeFilterOption) {
        payload = {
          params: {
            status: activeFilterOption,
          },
        };
      }
      this.fetchAllApplication(1, payload);
    }
  }

  /**
   * Renders the UI with Application_Component
   */
  render() {
    const {
      apiTrigger,
      refreshing,
      searchText,
      isSearch,
      stopLoading,
      showFilterApplications,
      activeFilterOption,
    } = this.state;
    const {applications, loading, searchApplications, userData} = this.props;

    const [currentPage, totalPages] = this.getPageInfo();
    const initialLoading =
      loading &&
      apiTrigger === API_TRIGGER.DEFAULT &&
      !refreshing &&
      !stopLoading;

    const dataToShow = isSearch ? searchApplications : applications;

    return (
      <Applications_Component
        dataToShow={dataToShow}
        onItemPress={this.onItemPress}
        handleTrackApplication={this.handleTrackApplication}
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
        loading={initialLoading}
        profileImage={userData?.profileImage}
        handleFilterApplications={this.handleFilterApplications}
        filterApplicationProps={{
          isVisible: showFilterApplications,
          handleCloseFilter: () =>
            this.setState({showFilterApplications: false}),
          onPressPrimaryButton: value => this.onPressPrimaryButton(value),
          onClearFilterButton: this.onClearFilterButton,
        }}
        activeFilterOption={activeFilterOption}
        stopLoading={stopLoading}
      />
    );
  }
}

// Redux: map dispatch actions to props
const mapDispatchToProps = {
  fetchLoanApplicationsThunk,
  clearSearchApplication,
  resetLoanApplication,
  setIsCreatingLoanApplication,
};

// Redux: map state to props
const mapStateToProps = ({loanData, user}) => {
  return {
    applications: loanData.applications,
    loading: loanData.loading,
    searchApplications: loanData?.searchApplications,
    page: loanData?.page,
    totalPage: loanData?.totalPage,
    searchPage: loanData.searchPage,
    searchTotalPages: loanData.searchTotalPages,
    userData: user?.userProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsScreen);
