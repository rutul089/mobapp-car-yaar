import React, {Component} from 'react';
import {connect} from 'react-redux';
import MoreOn_Financial_Component from './MoreOn_Financial_Component';
import {formatIndianCurrency} from '../../utils/helper';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {fetchCustomerMoreFinanceDetailThunk} from '../../redux/actions';
import {get} from 'lodash';

class MoreOnFinancialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClosePress = this.onClosePress.bind(this);
  }

  componentDidMount() {
    this.fetchCustomerMoreFinanceDetail();
  }

  fetchCustomerMoreFinanceDetail = () => {
    const {selectedCustomerId} = this.props;
    this.props.fetchCustomerMoreFinanceDetailThunk(
      selectedCustomerId,
      {},
      response => {},
    );
  };

  onClosePress = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  safeGet = (obj, path) => {
    return this.props.loading ? '-' : get(obj, path, '-');
  };

  render() {
    const {loading, moreOnFinance} = this.props;
    return (
      <MoreOn_Financial_Component
        cibilScore={this.safeGet(moreOnFinance, 'cibilScore') || '-'}
        lastUpdatedOn={null}
        cibilList={[
          {
            label: 'Desired Loan Amount',
            value: formatIndianCurrency(
              this.safeGet(moreOnFinance, 'loanAmount'),
            ),
          },
          {label: 'CarYaar Partner ID', value: '#TV9089'},
          {label: 'CarYaar Sale Executive ID', value: '#SE9031'},
        ]}
        loanAddReferences={moreOnFinance?.loanAddReferences}
        onClosePress={this.onClosePress}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {fetchCustomerMoreFinanceDetailThunk};
const mapStateToProps = ({customerData}) => {
  return {
    selectedCustomerId: customerData?.selectedCustomerId,
    moreOnFinance: customerData?.moreOnFinance,
    loading: customerData?.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(MoreOnFinancialScreen);
