import React, {Component} from 'react';
import Vehicle_Pricing_Component from './Vehicle_Pricing_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {connect} from 'react-redux';
import {loanType} from '../../constants/enums';

class VehiclePricingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBackPress = this.onBackPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  onNextPress = () => {
    const {selectedLoanType} = this.props;
    if (selectedLoanType === loanType.refinance) {
      return navigate(ScreenNames.VehicleHypothecation);
    } else {
      navigate(ScreenNames.CustomerDetail);
    }
  };
  //CustomerDetailView

  render() {
    return (
      <>
        <Vehicle_Pricing_Component
          onBackPress={this.onBackPress}
          onNextPress={this.onNextPress}
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
    selectedLoanType: state.global.selectedLoanType,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(VehiclePricingScreen);
