import React, {Component} from 'react';
import Vehicle_Pricing_Component from './Vehicle_Pricing_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

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
    navigate(ScreenNames.CustomerDetail);
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

export default VehiclePricingScreen;
