import React, {Component} from 'react';
import {connect} from 'react-redux';
import Lender_Details_Component from './Lender_Details_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {postCustomerLenderDetailsThunk} from '../../redux/actions';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onHoldProceedPress = this.onHoldProceedPress.bind(this);
    this.onLoanOfferPress = this.onLoanOfferPress.bind(this);
  }

  onHoldProceedPress = () => {
    const {selectedApplicationId} = this.props;

    let param = {
      lenderName: 'HDFC Bank',
      interesetRate: 8,
      tenure: 60,
      emi: 50000,
      processingFee: 1200,
      principalAmount: 1000,
    };
    this.props.postCustomerLenderDetailsThunk(
      selectedApplicationId,
      param,
      async success => {
        let rawParams = getScreenParam(this.props.route, 'params');
        navigate(ScreenNames.LoanOfferDetail, {
          ...rawParams,
          loanDetail: {title: 'HDFC Bank', interestRate: '8.9'},
        });
      },
    );
  };

  onLoanOfferPress = () => {
    navigate(ScreenNames.CustomizeLoanOffer);
  };

  render() {
    const {loading} = this.props;
    return (
      <Lender_Details_Component
        onHoldProceedPress={this.onHoldProceedPress}
        onLoanOfferPress={this.onLoanOfferPress}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {postCustomerLenderDetailsThunk};
const mapStateToProps = ({loanData, user}) => ({
  selectedLoanType: loanData.selectedLoanType,
  loading: loanData.loading,
  selectedLoanApplication: loanData.selectedLoanApplication,
  selectedApplicationId: loanData.selectedApplicationId,
  partnerId: user?.userProfile?.partnerUser?.partnerId,
  userProfile: user?.userProfile,
});

export default connect(mapStateToProps, mapActionCreators)(index);
