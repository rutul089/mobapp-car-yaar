import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import {fetchCustomerMoreFinanceDetailThunk} from '../../redux/actions';
import {formatIndianCurrency, formatShortId, safeGet} from '../../utils/helper';
import MoreOn_Financial_Component from './MoreOn_Financial_Component';

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
    goBack();
    // navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  render() {
    const {loading, moreOnFinance} = this.props;
    let partnerId = safeGet(loading, moreOnFinance, 'partnerId');
    let salesExecutiveId = safeGet(loading, moreOnFinance, 'salesExecutiveId');
    return (
      <MoreOn_Financial_Component
        cibilScore={safeGet(loading, moreOnFinance, 'cibilScore') || '-'}
        lastUpdatedOn={null}
        cibilList={[
          {
            label: 'Desired Loan Amount',
            value: formatIndianCurrency(
              safeGet(loading, moreOnFinance, 'loanAmount'),
            ),
          },
          {label: 'CarYaar Partner ID', value: formatShortId(partnerId)},
          {
            label: 'CarYaar Sale Executive ID',
            value: formatShortId(salesExecutiveId),
          },
        ]}
        loanReferences={moreOnFinance?.loanReferences}
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
