import React, {Component} from 'react';
import Vehicles_Component from './Vehicles_Component';
import {formatIndianNumber} from '../../utils/helper';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: [
        {
          brandName: 'Maruti Suzuki',
          vehicleDetail: 'Vitara Brezza | VDI | GY',
          plateNumber: 'GJ 01 WN 5054',
          status: 'SAVED',
          logo: 'https://i.pravatar.cc/150',
          footerInfo: [
            {
              label: 'Mfg Year',
              value: '2019',
              style: {flex: 1, marginRight: 5},
            },
            {
              label: 'Seller Price',
              value: formatIndianNumber(1200000),
              style: {flex: 1.5, marginRight: 5},
            },
            {
              label: 'Hypothecation Status',
              value: 'Yes',
              style: {flex: 2},
            },
          ],
        },
        {
          brandName: 'Hyundai',
          vehicleDetail: 'i20 Sportz | Petrol',
          plateNumber: 'MH 12 AB 1234',
          status: 'DRAFT',
          logo: 'https://i.pravatar.cc/150',
          footerInfo: [
            {
              label: 'Mfg Year',
              value: '2020',
              style: {flex: 1, marginRight: 5},
            },
            {
              label: 'Seller Price',
              value: formatIndianNumber(950000),
              style: {flex: 1.5, marginRight: 5},
            },
            {
              label: 'Hypothecation Status',
              value: 'No',
              style: {flex: 2},
            },
          ],
        },
        {
          brandName: 'Tata',
          vehicleDetail: 'Nexon EV | XZ+',
          plateNumber: 'DL 09 CD 5678',
          status: 'SAVED',
          logo: 'https://i.pravatar.cc/150',
          footerInfo: [
            {
              label: 'Mfg Year',
              value: '2021',
              style: {flex: 1, marginRight: 5},
            },
            {
              label: 'Seller Price',
              value: formatIndianNumber(1400000),
              style: {flex: 1.5, marginRight: 5},
            },
            {
              label: 'Hypothecation Status',
              value: 'Yes',
              style: {flex: 2},
            },
          ],
        },
        {
          brandName: 'Honda',
          vehicleDetail: 'City ZX | CVT',
          plateNumber: 'KA 03 EF 7890',
          status: 'DRAFT',
          footerInfo: [
            {
              label: 'Mfg Year',
              value: '2018',
              style: {flex: 1, marginRight: 5},
            },
            {
              label: 'Seller Price',
              value: formatIndianNumber(870000),
              style: {flex: 1.5, marginRight: 5},
            },
            {
              label: 'Hypothecation Status',
              value: 'No',
              style: {flex: 2},
            },
          ],
        },
      ],
    };
    this.onWrapperClick = this.onWrapperClick.bind(this);
  }

  onWrapperClick = () => {
    navigate(ScreenNames.VehicleDetail);
  };

  render() {
    return (
      <>
        <Vehicles_Component
          vehicleData={this.state.vehicleData}
          onWrapperClick={this.onWrapperClick}
        />
      </>
    );
  }
}

export default Vehicles;
