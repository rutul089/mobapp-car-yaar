import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loan_Offer_Detail_Component from './Loan_Offer_Detail_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class LoanOfferDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onProceedPress = this.onProceedPress.bind(this);
  }

  componentDidMount() {}

  onProceedPress = () => {
    navigate(ScreenNames.AddReference);
  };

  render() {
    return (
      <>
        <Loan_Offer_Detail_Component onProceedPress={this.onProceedPress} />
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
