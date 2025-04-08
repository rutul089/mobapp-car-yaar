import React, {Component} from 'react';
import {connect} from 'react-redux';
import View_Loan_Details_Component from './View_Loan_Details_Component';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class ViewLoanDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBackToHomePress = this.onBackToHomePress.bind(this);
    this.onTrackLoanStatusPress = this.onTrackLoanStatusPress.bind(this);
  }

  componentDidMount() {}

  onBackToHomePress = () => {
    navigateAndSimpleReset(ScreenNames.HomeTab);
  };

  onTrackLoanStatusPress = () => {};

  render() {
    return (
      <>
        <View_Loan_Details_Component
          loanDetails={[
            {label: 'Lender Name', value: 'HDB Financial Services'},
            {label: 'Interest Rate', value: '8.96%'},
            {label: 'Loan Amount', value: '₹12,00,000'},
            {label: 'Tenure', value: '60 Months'},
            {label: 'EMI', value: '₹10,000'},
            {label: 'Processing Fee', value: '₹1000 '},
            {label: 'Principal Amount', value: '₹10,00,000'},
            {label: 'Loan Type', value: 'Purchase'},
          ]}
          customerDetail={[
            {label: 'Customer Name', value: 'Aayushman Nayak'},
            {label: 'Customer ID', value: '#968040'},
            {label: 'Customer Type', value: 'Individual'},
            {label: 'Individual Type', value: 'Salaried'},
            {label: 'Mobile Number', value: '98653 90981'},
            {label: 'Gender', value: 'Male'},
            {label: 'Father/Mother Name', value: 'Jyotiben Nayak'},
            {label: 'Spouse Name', value: 'Suresh Nayak'},
            {
              label: 'Email address',
              value: 'aayushman_nayak85@gmail.com',
              full: true,
            },
            {label: 'Date of Birth', value: '13 Aug 1993'},
            {
              label: 'Current Address',
              value: '84, MadhaviGarh, Rehman Nagar',
              full: true,
            },
            {label: 'Current Pincode', value: '255488 - Ahmedabad'},
            {label: 'Occupation', value: 'Other'},
            {label: 'Income Source', value: 'Salaried'},
            {label: 'Monthly Income', value: '₹50,000'},
          ]}
          vehicleDetail={[
            {label: 'Vehicle Type', value: 'Private Car'},
            {label: 'Register Number', value: 'GJ 27 GY 1001'},
            {label: 'Owner Name', value: 'Jagat Merchant'},
            {label: 'Manufacture Year', value: '2019'},
            {label: 'Chassis Number', value: '4S3BMHB68B3286050'},
            {label: 'Engine Number', value: '52WVC10338'},
            {label: 'Registration Date', value: '17 Sep 2019'},
            {label: 'Registration Authority', value: 'RTO Ahmedabad'},
            {label: 'Fuel Type', value: 'Diesel'},
            {label: 'Emission Norm', value: 'BSVI'},
            {label: 'Vehicle Age', value: '9 Years'},
            {label: 'Hypothecated', value: 'No'},
            {label: 'Vehicle Status', value: 'Active'},
            {label: 'Insurance Valid Upto', value: '17 Sep 2025'},
            {label: 'Fitness Valid Upto', value: '17 Sep 2025'},
            {label: 'PUCC', value: 'Yes'},
            {label: 'Ownership', value: '2'},
          ]}
          partnerDetail={[
            {label: 'Partner ID', value: '0123'},
            {label: 'Partner Name', value: 'Partner Name'},
            {
              label: 'Sales Executive Name',
              value: 'Mahmood Butala',
              full: true,
            },
          ]}
          onTrackLoanStatusPress={this.onTrackLoanStatusPress}
          onBackToHomePress={this.onBackToHomePress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ViewLoanDetailsScreen);
