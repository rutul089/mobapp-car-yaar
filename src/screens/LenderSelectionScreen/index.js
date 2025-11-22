import {Component} from 'react';
import {connect} from 'react-redux';
import {API_TRIGGER} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import {
  fetchAllLendersThunk,
  postCustomerLenderDetailsThunk,
} from '../../redux/actions';
import {formatVehicleNumber} from '../../utils/helper';
import Lender_Selection_Component from './Lender_Selection_Component';

class LenderSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
      apiTrigger: API_TRIGGER.DEFAULT,
      refreshing: false,
      stopLoading: false,
      activeFilterOption: '',
    };
    this.onItemPress = this.onItemPress.bind(this);
    this.limit = 10; // Items per page
  }

  componentDidMount() {
    this.fetchLendersDetail();
  }

  fetchLendersDetail = (page = 1, param = {}) => {
    const {selectedLoanApplication} = this.props;

    this.props
      .fetchAllLendersThunk(
        page,
        this.limit,
        selectedLoanApplication?.loanAmount,
        param,
      )
      .finally(() => {
        this.setState({
          refreshing: false,
          apiTrigger: API_TRIGGER.DEFAULT,
          stopLoading: false,
        });
      });
  };

  onItemPress = async item => {
    const {selectedApplicationId} = this.props;

    let param = {
      lenderName: item?.lenderName,
      interesetRate: Number(item?.interestRate),
      tenure: Number(item?.tenure),
      emi: parseFloat(item?.emi),
      processingFee: parseFloat(item?.processingFee),
      principalAmount: item?.principalAmount ?? item?.principal ?? 1000,
    };

    this.props.postCustomerLenderDetailsThunk(
      selectedApplicationId,
      param,
      async success => {
        let rawParams = getScreenParam(this.props.route, 'params');
        await navigate(ScreenNames.LoanOfferDetail, {
          ...rawParams,
          loanDetail: {
            title: item?.lenderName,
            interestRate: item?.interestRate || 8,
            tenure: Number(item?.tenure) || 60,
            emi: parseFloat(item?.emi) || 20000,
            processingFee: parseFloat(item?.processingFee),
            lenderLogo: item?.lenderLogo,
          },
        });
      },
    );
  };

  getPageInfo = () => {
    const {page, totalPage, searchPage, searchTotalPages} = this.props;
    const {isSearch} = this.state;
    return isSearch ? [searchPage, searchTotalPages] : [page, totalPage];
  };

  pullToRefresh = async () => {
    this.setState({
      refreshing: true,
      searchText: '',
      isSearch: false,
      apiTrigger: API_TRIGGER.PULL_TO_REFRESH,
    });

    await this.fetchLendersDetail();
  };

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

    const extraParams = this.parseKeyValueArray(activeFilterOption);

    let payload = {
      params: {
        ...extraParams,
      },
    };

    if (isSearch) {
      this.fetchLendersDetail(nextPage, {params: {search: searchText.trim()}});
    } else {
      this.fetchLendersDetail(nextPage, activeFilterOption ? payload : {});
    }
  };

  handleApplyFilter = value => {
    this.setState({
      activeFilterOption: value,
    });
  };

  onClearFilterButton = () => {
    this.setState({
      activeFilterOption: [],
    });
  };

  parseKeyValueArray = arr => {
    if (!Array.isArray(arr)) {
      return {};
    }

    return arr.reduce((acc, item) => {
      const [key, value] = item.split('=');
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  componentDidUpdate(prevProps, prevState) {
    const {activeFilterOption} = this.state;
    // Run filter fetch if activeFilterOption changes and it's not a search
    if (prevState.activeFilterOption !== activeFilterOption) {
      let payload = {};

      const extraParams = this.parseKeyValueArray(activeFilterOption);

      if (activeFilterOption.length > 0) {
        payload = {
          params: {
            ...extraParams, // ← add your sort params here
            // sortOrder: 'asc',
          },
        };
      }
      this.fetchLendersDetail(1, payload);
    }
  }

  render() {
    const {selectedLoanApplication, loading, lenders} = this.props;
    const {apiTrigger, refreshing, stopLoading, activeFilterOption} =
      this.state;

    const [currentPage, totalPages] = this.getPageInfo();

    const registerNumberValue =
      selectedLoanApplication?.usedVehicle?.registerNumber || '-';
    let loanAmount = selectedLoanApplication?.loanAmount || 500000;
    let processingFee = selectedLoanApplication?.processingFee || 1000;

    const initialLoading =
      loading &&
      apiTrigger === API_TRIGGER.DEFAULT &&
      !refreshing &&
      !stopLoading;

    return (
      <Lender_Selection_Component
        registerNumber={formatVehicleNumber(registerNumberValue)}
        loanApplicationId={selectedLoanApplication?.loanApplicationId}
        onItemPress={this.onItemPress}
        loading={initialLoading}
        loanAmount={loanAmount}
        processingFee={processingFee}
        lenders={lenders}
        apiTrigger={apiTrigger}
        totalPages={totalPages}
        currentPage={currentPage}
        refreshing={refreshing}
        onRefresh={this.pullToRefresh}
        handleLoadMore={this.handleLoadMore}
        filterProps={{
          handleApplyFilter: value => this.handleApplyFilter(value),
          onClearFilterButton: this.onClearFilterButton,
        }}
        activeFilterOption={activeFilterOption}
      />
    );
  }
}

const mapActionCreators = {
  postCustomerLenderDetailsThunk,
  fetchAllLendersThunk,
};
const mapStateToProps = ({loanData, lenderData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading || lenderData?.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
    page: lenderData?.page,
    totalPage: lenderData?.totalPage,
    lenders: lenderData?.lenders,
  };
};
export default connect(mapStateToProps, mapActionCreators)(LenderSelection);
