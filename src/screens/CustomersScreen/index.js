import React, {Component} from 'react';
import Customers_Component from './Customers_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {connect} from 'react-redux';
import {
  clearCustomerSearch,
  fetchAllCustomersThunk,
  resetSelectedCustomer,
} from '../../redux/actions';
import {API_TRIGGER} from '../../constants/enums';

class CustomersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // API state
      apiTrigger: API_TRIGGER.DEFAULT,
      refreshing: false,

      // Search state
      isSearch: false,
      searchText: '',

      // Optional full-screen toggle state
      fullScreen: false,
    };

    this.limit = 10; // Items per page
  }

  componentDidMount = () => {
    // Initial data fetch
    this.fetchAllCustomer();
  };

  /**
   * Fetches customer data using Redux thunk
   * @param {number} page - Page number
   * @param {object} param - Optional search or filter parameters
   */
  fetchAllCustomer = (page = 1, param = {}) => {
    this.props.fetchAllCustomersThunk(page, this.limit, param).finally(() => {
      this.setState({refreshing: false, apiTrigger: API_TRIGGER.DEFAULT});
    });
  };

  /**
   * Triggered when user scrolls to bottom of list.
   * Loads next page if available.
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
      this.fetchAllCustomer(nextPage, {params: {search: searchText.trim()}});
    } else {
      this.fetchAllCustomer(nextPage);
    }
  };

  /**
   * Returns current page and total pages based on search state.
   */
  getPageInfo = () => {
    const {page, totalPage, searchPage, searchTotalPages} = this.props;
    const {isSearch} = this.state;
    return isSearch ? [searchPage, searchTotalPages] : [page, totalPage];
  };

  /**
   * Pull-to-refresh action handler.
   * Clears search state and re-fetches data.
   */
  pullToRefresh = async () => {
    this.setState({
      refreshing: true,
      searchText: '',
      isSearch: false,
      apiTrigger: API_TRIGGER.PULL_TO_REFRESH,
    });

    this.props.clearCustomerSearch();
    await this.fetchAllCustomer();
  };

  /**
   * On customer list item click
   */
  onWrapperClick = item => {
    this.props.resetSelectedCustomer();
    navigate(ScreenNames.CustomerInfo, {param: item});
  };

  /**
   * Tracks text input from search bar
   */
  onSearchText = value => {
    const trimmed = value.trim();
    this.setState({searchText: value, apiTrigger: API_TRIGGER.DEFAULT}, () => {
      if (trimmed === '') {
        this.setState({isSearch: false});
        this.props.clearCustomerSearch();
      }
    });
  };

  /**
   * Clears current search and resets the list
   */
  clearSearch = () => {
    this.setState({searchText: '', isSearch: false});
    this.props.clearCustomerSearch();
  };

  /**
   * Initiates search by calling the API with search keyword
   */
  searchFromAPI = text => {
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      this.setState({isSearch: false});
      return;
    }

    this.setState({isSearch: true, apiTrigger: API_TRIGGER.DEFAULT});
    this.fetchAllCustomer(1, {params: {search: trimmed}});
  };

  render() {
    const {apiTrigger, refreshing, searchText, isSearch} = this.state;
    const {customers, loading, searchCustomers} = this.props;

    const [currentPage, totalPages] = this.getPageInfo();
    const initialLoading =
      loading && apiTrigger === API_TRIGGER.DEFAULT && !refreshing;

    const dataToShow = isSearch ? searchCustomers : customers;

    return (
      <Customers_Component
        customerList={dataToShow}
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
      />
    );
  }
}

// Redux mappings
const mapDispatchToProps = {
  fetchAllCustomersThunk,
  clearCustomerSearch,
  resetSelectedCustomer,
};

const mapStateToProps = ({customerData}) => {
  return {
    customers: customerData?.customers,
    searchCustomers: customerData?.searchCustomer,
    page: customerData?.page,
    totalPage: customerData?.totalPage,
    loading: customerData?.loading,
    searchPage: customerData.searchPage,
    searchTotalPages: customerData.searchTotalPages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen);
