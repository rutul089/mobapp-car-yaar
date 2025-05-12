import React, {Component} from 'react';
import {connect} from 'react-redux';
import Lender_Details_Component from './Lender_Details_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onHoldProceedPress = this.onHoldProceedPress.bind(this);
    this.onLoanOfferPress = this.onLoanOfferPress.bind(this);
  }

  onHoldProceedPress = () => {
    navigate(ScreenNames.LoanOfferDetail);
  };

  onLoanOfferPress = () => {
    navigate(ScreenNames.CustomizeLoanOffer);
  };

  render() {
    return (
      <>
        <Lender_Details_Component
          onHoldProceedPress={this.onHoldProceedPress}
          onLoanOfferPress={this.onLoanOfferPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(index);
