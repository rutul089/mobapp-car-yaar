import React, {Component} from 'react';
import Vehicle_Odometer_Component from './Vehicle_Odometer_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {pickImage} from '../../utils/imagePicker';
import {Alert} from 'react-native';
import ScreenNames from '../../constants/ScreenNames';

class VehicleOdometerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odometerImage: null,
      odometerValue: '',
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.handleOdometerImageSelect = this.handleOdometerImageSelect.bind(this);
    this.selectedVehicleCondition = this.selectedVehicleCondition.bind(this);
    this.handleOdometerChange = this.handleOdometerChange.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  handleOdometerImageSelect = async () => {
    const image = await pickImage(false);
    console.log({image});
  };

  selectedVehicleCondition = () => {
    Alert.alert('Test');
  };

  handleOdometerChange = value => {
    this.setState({
      odometerValue: value,
    });
  };

  onNextPress = () => {
    navigate(ScreenNames.VehiclePricing);
  };

  render() {
    return (
      <>
        <Vehicle_Odometer_Component
          onBackPress={this.onBackPress}
          handleOdometerImageSelect={this.handleOdometerImageSelect}
          odometerImage={this.state.odometerImage}
          selectedVehicleCondition={this.selectedVehicleCondition}
          handleOdometerChange={this.handleOdometerChange}
          odometerValue={this.state.odometerValue}
          onNextPress={this.onNextPress}
        />
      </>
    );
  }
}

export default VehicleOdometerScreen;
