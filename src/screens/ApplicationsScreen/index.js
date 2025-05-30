import React, {Component} from 'react';
import {connect} from 'react-redux';
import {API_TRIGGER} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import {
  clearSearchApplication,
  fetchLoanApplicationsThunk,
  resetLoanApplication,
} from '../../redux/actions';
import Applications_Component from './Applications_Component';

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
    };

    this.limit = 10; // Pagination limit
    this.onItemPress = this.onItemPress.bind(this);
    this.handleTrackApplication = this.handleTrackApplication.bind(this);
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
        this.setState({refreshing: false, apiTrigger: API_TRIGGER.DEFAULT});
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
    });

    this.props.clearSearchApplication();
    await this.fetchAllApplication();
  };

  /**
   * Handles infinite scroll logic to fetch the next page.
   */
  handleLoadMore = () => {
    const {loading} = this.props;
    const {isSearch, searchText} = this.state;

    if (loading) {
      return;
    }

    const [currentPage, totalPages] = this.getPageInfo();
    if (currentPage >= totalPages) {
      return;
    }

    const nextPage = currentPage + 1;
    this.setState({apiTrigger: API_TRIGGER.LOAD_MORE});

    if (isSearch) {
      this.fetchAllApplication(nextPage, {params: {search: searchText.trim()}});
    } else {
      this.fetchAllApplication(nextPage);
    }
  };

  /**
   * Handles real-time updates to the search input.
   * Clears search if text is empty.
   * @param {string} value - Input text.
   */
  onSearchText = value => {
    const trimmed = value.trim();
    this.setState({searchText: value, apiTrigger: API_TRIGGER.DEFAULT}, () => {
      if (trimmed === '') {
        this.setState({isSearch: false});
        this.props.clearSearchApplication();
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

    this.setState({isSearch: true, apiTrigger: API_TRIGGER.DEFAULT});
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

  /**
   * Renders the UI with Application_Component
   */
  render() {
    const {apiTrigger, refreshing, searchText, isSearch} = this.state;
    const {applications, loading, searchApplications, userData} = this.props;

    const [currentPage, totalPages] = this.getPageInfo();
    const initialLoading =
      loading && apiTrigger === API_TRIGGER.DEFAULT && !refreshing;

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
      />
    );
  }
}

// Redux: map dispatch actions to props
const mapDispatchToProps = {
  fetchLoanApplicationsThunk,
  clearSearchApplication,
  resetLoanApplication,
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
