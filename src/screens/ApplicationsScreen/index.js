import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Applications_Component from './Applications_Component';
import {formatIndianNumber} from '../../utils/helper';

class ApplicationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onItemPress = this.onItemPress.bind(this);
    this.handleTrackApplication = this.handleTrackApplication.bind(this);
  }

  onItemPress = item => {
    navigate(ScreenNames.ViewLoanDetail, {params: item});
  };

  handleTrackApplication = item => {
    navigate(ScreenNames.TrackApplication, {params: item});
  };

  render() {
    return (
      <>
        <Applications_Component
          onItemPress={this.onItemPress}
          handleTrackApplication={this.handleTrackApplication}
          dummyList={[
            {
              id: '#1023',
              title: 'HDFC Bank',
              interestRate: 10.2,
              isEligible: true,
              badge: 1,
              image: 'https://i.pravatar.cc/150?img=1',
              footerInfo: [
                {label: 'EMI', value: formatIndianNumber(41000)},
                {label: 'Tenure', value: '48 Months'},
                {label: 'Loan Amount', value: formatIndianNumber(1200000)},
              ],
              status: 'Draft',
              type: 1,
            },
            {
              id: '#2047',
              title: 'Axis Bank',
              interestRate: 9.5,
              isEligible: false,
              badge: 2,
              image: 'https://i.pravatar.cc/150?img=2',
              footerInfo: [
                {label: 'EMI', value: formatIndianNumber(39000)},
                {label: 'Tenure', value: '24 Months'},
                {label: 'Loan Amount', value: formatIndianNumber(1200000)},
              ],
              status: 'lender approved',
              type: 3,
            },
            {
              id: '#3561',
              title: 'SBI',
              interestRate: 11.0,
              isEligible: true,
              badge: 5,
              image: 'https://img.icons8.com/ios-filled/100/bank.png',
              footerInfo: [
                {label: 'EMI', value: formatIndianNumber(39000)},
                {label: 'Tenure', value: '60 Months'},
                {label: 'Loan Amount', value: formatIndianNumber(1200000)},
              ],
              status: 'Applied',
              type: 2,
            },
            {
              id: '#4892',
              title: 'ICICI',
              interestRate: 9.8,
              isEligible: true,
              badge: 3,
              image: 'https://i.pravatar.cc/150?img=3',
              footerInfo: [
                {label: 'EMI', value: formatIndianNumber(39000)},
                {label: 'Tenure', value: '36 Months'},
                {label: 'Loan Amount', value: formatIndianNumber(1200000)},
              ],
              status: 'on hold',
              type: 4,
            },
          ]}
        />
      </>
    );
  }
}

export default ApplicationsScreen;
