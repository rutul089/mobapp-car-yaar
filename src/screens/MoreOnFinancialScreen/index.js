import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goBack} from '../../navigation/NavigationUtils';
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
          {
            label: 'CarYaar Partner ID',
            value: safeGet(loading, moreOnFinance, 'partnerUserNumber'),
          },
          {
            label: 'CarYaar Sale Executive ID',
            value: safeGet(loading, moreOnFinance, 'salesExecutiveNumber'),
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
