import React, {Component} from 'react';
import {connect} from 'react-redux';
import MoreOn_Financial_Component from './MoreOn_Financial_Component';
import {formatIndianCurrency} from '../../utils/helper';
import {navigateAndSimpleReset} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class MoreOnFinancialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClosePress = this.onClosePress.bind(this);
  }

  componentDidMount() {}

  onClosePress = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  render() {
    return (
      <>
        <MoreOn_Financial_Component
          cibilList={[
            {
              label: 'Desired Loan Amount',
              value: formatIndianCurrency(1100000),
            },
            {label: 'CarYaar Partner ID', value: '#TV9089'},
            {label: 'CarYaar Sale Executive ID', value: '#SE9031'},
          ]}
          homeVerificationList={[
            {label: 'Reference Name', value: 'Richa Narayanan'},
            {label: 'Mobile Number', value: '89842 09812'},
            {label: 'Relationship', value: 'Relative', full: true},
            {
              label: 'Address',
              value: '68, Kalpana Villas, Marathahalli',
              full: true,
            },
            {label: 'Pincode', value: '353986 - Jodhpur', full: true},
          ]}
          officeVerificationList={[
            {label: 'Reference Name', value: 'Richa Narayanan'},
            {label: 'Mobile Number', value: '89842 09812'},
            {label: 'Relationship', value: 'Relative', full: true},
            {
              label: 'Address',
              value: '68, Kalpana Villas, Marathahalli',
              full: true,
            },
            {label: 'Pincode', value: '353986 - Jodhpur', full: true},
          ]}
          onClosePress={this.onClosePress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(MoreOnFinancialScreen);
