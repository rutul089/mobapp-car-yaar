import React, {Component} from 'react';
import Search_Component from './Search_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {isValidAlphanumeric} from '../../utils/validation';
import strings from '../../locales/strings';
import ScreenNames from '../../constants/ScreenNames';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddVehicle: false,
      vehicleNumber: '',
      showError: false,
      statusMsg: '',
      showStatusIcon: false,
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onAddVehicle = this.onAddVehicle.bind(this);
    this.onSearchVehicle = this.onSearchVehicle.bind(this);
    this.onVehicleNumberChange = this.onVehicleNumberChange.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  onAddVehicle = () => {};

  onSearchVehicle = () => {
    const {vehicleNumber} = this.state;
    const isValid = isValidAlphanumeric(vehicleNumber);
    if (!isValid) {
      this.setState({
        showError: true,
        statusMsg: 'Please add valid vehicle number',
      });
      return;
    }
    navigate(ScreenNames.VehicleDetail);
    // Bellow code if api fail need to add vehicle
    // setTimeout(() => {
    //   this.setState({
    //     statusMsg: strings.vehicleNotFound,
    //     showStatusIcon: true,
    //     showAddVehicle: true,
    //     showError: true,
    //   });
    // }, 1000);
  };

  onVehicleNumberChange = value => {
    this.setState({
      vehicleNumber: value,
      showError: false,
      showStatusIcon: false,
      showAddVehicle: false,
    });
  };

  render() {
    const {
      showAddVehicle,
      vehicleNumber,
      statusMsg,
      showError,
      showStatusIcon,
    } = this.state;
    return (
      <>
        <Search_Component
          onBackPress={this.onBackPress}
          onAddVehicle={this.onAddVehicle}
          onSearchVehicle={this.onSearchVehicle}
          showAddVehicle={showAddVehicle}
          onVehicleNumberChange={this.onVehicleNumberChange}
          vehicleNumber={vehicleNumber}
          statusMsg={statusMsg}
          showError={showError}
          showStatusIcon={showStatusIcon}
        />
      </>
    );
  }
}

export default SearchScreen;
