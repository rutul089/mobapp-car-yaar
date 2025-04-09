import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customer_Financial_Docs_Component from './Customer_Financial_Documents_Component';
import {formatIndianNumber} from '../../utils/helper';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class CustomerFinancialDocsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {}

  onNextPress = () => {
    navigate(ScreenNames.MoreOnFinancial);
  };

  render() {
    return (
      <>
        <Customer_Financial_Docs_Component
          onNextPress={this.onNextPress}
          documentList={[
            {
              label: 'NOC',
              image: 'https://i.pravatar.cc/150?img=3',
            },
            {
              label: 'Form 34',
              image: 'https://i.pravatar.cc/150',
            },
            {
              label: 'Other Documents',
              image: 'https://i.pravatar.cc/150',
            },
          ]}
          loanDetails={[
            {label: 'Bank Name', value: 'HDFC Bank'},
            {label: 'Loan Account Number', value: '598407587258a1'},
            {label: 'Loan Amount', value: formatIndianNumber(1000000)},
            {label: 'Tenure', value: '60 Months'},
            {label: 'Monthly EMI', value: formatIndianNumber(12000)},
            {label: 'When was this loan closed', value: 'Jun 2025'},
          ]}
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
)(CustomerFinancialDocsScreen);
