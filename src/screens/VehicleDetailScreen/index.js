import React, {Component} from 'react';
import Vehicle_Detail_Component from './Vehicle_Detail_Component';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class VehicleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onBackPress = this.onBackPress.bind(this);
    this.onSaveDraftPress = this.onSaveDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  onSaveDraftPress = () => {};

  onNextPress = () => {
    navigate(ScreenNames.VehicleImages);
  };

  render() {
    return (
      <>
        <Vehicle_Detail_Component
          onBackPress={this.onBackPress}
          onSaveDraftPress={this.onSaveDraftPress}
          onNextPress={this.onNextPress}
          vehicleInfo={[
            {label: 'Owner Name', value: 'Aayushman Nayak'},
            {label: 'Manufacture Year', value: '2024'},
            {label: 'Chassis Number', value: '4S3BMHB68B3286050'},
            {label: 'Engine Number', value: '52WVC10338'},
            {label: 'Registration Date', value: '24 Oct 2019'},
            {label: 'Registration Authority', value: 'RTO Ahmedabad'},
            {label: 'Fuel Type', value: 'Diesel'},
            {label: 'Emission Norm', value: 'BSVI'},
            {label: 'Vehicle Age', value: '9 Years'},
            {label: 'Hypothecation Status', value: 'HDFC Bank'},
            {label: 'Vehicle Status', value: 'Active'},
            {label: 'Insurance Valid Upto', value: '18 Dec 2025'},
            {label: 'Fitness Valid Upto', value: '10 Jan 2035'},
            {label: 'PUC', value: 'Yes'},
            {label: 'Ownership', value: '2'},
          ]}
        />
      </>
    );
  }
}

export default VehicleDetail;
