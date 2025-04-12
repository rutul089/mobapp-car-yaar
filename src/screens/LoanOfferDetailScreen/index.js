import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loan_Offer_Detail_Component from './Loan_Offer_Detail_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class LoanOfferDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanDetail: {},
    };
    this.onProceedPress = this.onProceedPress.bind(this);
    this.onLoanOfferPress = this.onLoanOfferPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let loanDetail = getScreenParam(route, 'params');
    this.setState(
      {
        loanDetail,
      },
      () => {
        console.log({loanDetail: this.state.loanDetail});
      },
    );
  }
  onProceedPress = () => {
    navigate(ScreenNames.AddReference);
  };

  onLoanOfferPress = () => {
    navigate(ScreenNames.CustomizeLoanOffer);
  };

  render() {
    return (
      <>
        <Loan_Offer_Detail_Component
          onProceedPress={this.onProceedPress}
          onLoanOfferPress={this.onLoanOfferPress}
          loanDetail={this.state.loanDetail}
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
)(LoanOfferDetailScreen);
