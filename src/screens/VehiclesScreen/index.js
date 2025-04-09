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
          logo: 'https://s3-alpha-sig.figma.com/img/dc01/6a77/dd25896e1075506aa8034c732bbf7198?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eTZ3MhrIqljjgXn61-htsdXM99lnKLeVR8d1YPWbAc1d0syyssb3kQ-M2NALIqTQGPRO548Aqxsj9Boh293pavrlkmAOI3F8WwV1Uh5lYkIpd5H5QyALyQtvzzYbBwrGy7zQ8~6OLfon29ZPTzdjAjSyz7J7gKbOw3YKcW35xSB5VCunUZOHqBBUUABV41yYmKJLhbk86vA8sys6Fxvc6AWBqb32yW~ZV19ABKCdL9if7IkiyusZ9I~PZgAa3MDxCm5MbGIoro3kl~rgj10x0iB1eE~YBMWaX9EStY991EJOl5MIJ7oA8ASQxLj3-215Xt1qItu6efXcyMQTwgdkPA__',
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
          logo: 'https://s3-alpha-sig.figma.com/img/dc01/6a77/dd25896e1075506aa8034c732bbf7198?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eTZ3MhrIqljjgXn61-htsdXM99lnKLeVR8d1YPWbAc1d0syyssb3kQ-M2NALIqTQGPRO548Aqxsj9Boh293pavrlkmAOI3F8WwV1Uh5lYkIpd5H5QyALyQtvzzYbBwrGy7zQ8~6OLfon29ZPTzdjAjSyz7J7gKbOw3YKcW35xSB5VCunUZOHqBBUUABV41yYmKJLhbk86vA8sys6Fxvc6AWBqb32yW~ZV19ABKCdL9if7IkiyusZ9I~PZgAa3MDxCm5MbGIoro3kl~rgj10x0iB1eE~YBMWaX9EStY991EJOl5MIJ7oA8ASQxLj3-215Xt1qItu6efXcyMQTwgdkPA__',
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
          logo: 'https://s3-alpha-sig.figma.com/img/dc01/6a77/dd25896e1075506aa8034c732bbf7198?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eTZ3MhrIqljjgXn61-htsdXM99lnKLeVR8d1YPWbAc1d0syyssb3kQ-M2NALIqTQGPRO548Aqxsj9Boh293pavrlkmAOI3F8WwV1Uh5lYkIpd5H5QyALyQtvzzYbBwrGy7zQ8~6OLfon29ZPTzdjAjSyz7J7gKbOw3YKcW35xSB5VCunUZOHqBBUUABV41yYmKJLhbk86vA8sys6Fxvc6AWBqb32yW~ZV19ABKCdL9if7IkiyusZ9I~PZgAa3MDxCm5MbGIoro3kl~rgj10x0iB1eE~YBMWaX9EStY991EJOl5MIJ7oA8ASQxLj3-215Xt1qItu6efXcyMQTwgdkPA__',
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
          logo: 'https://s3-alpha-sig.figma.com/img/dc01/6a77/dd25896e1075506aa8034c732bbf7198?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eTZ3MhrIqljjgXn61-htsdXM99lnKLeVR8d1YPWbAc1d0syyssb3kQ-M2NALIqTQGPRO548Aqxsj9Boh293pavrlkmAOI3F8WwV1Uh5lYkIpd5H5QyALyQtvzzYbBwrGy7zQ8~6OLfon29ZPTzdjAjSyz7J7gKbOw3YKcW35xSB5VCunUZOHqBBUUABV41yYmKJLhbk86vA8sys6Fxvc6AWBqb32yW~ZV19ABKCdL9if7IkiyusZ9I~PZgAa3MDxCm5MbGIoro3kl~rgj10x0iB1eE~YBMWaX9EStY991EJOl5MIJ7oA8ASQxLj3-215Xt1qItu6efXcyMQTwgdkPA__',
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
