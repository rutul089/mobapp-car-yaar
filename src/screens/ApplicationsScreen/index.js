import React, {Component} from 'react';
import ScreenNames from '../../constants/ScreenNames';
import {navigate} from '../../navigation/NavigationUtils';
import Applications_Component from './Applications_Component';

class ApplicationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress = item => {
    navigate(ScreenNames.ViewLoanDetail);
  };

  render() {
    return (
      <>
        <Applications_Component
          onItemPress={this.onItemPress}
          dummyList={[
            {
              id: '1',
              title: 'Bajaj Finserv',
              interestRate: 10.25,
              isEligible: true,
              badge: 1,
              image: 'https://i.pravatar.cc/150?img=3',
              footerInfo: [
                {label: 'Tenure', value: '24M'},
                {label: 'EMI', value: '₹5,450'},
                {label: 'Processing Fee', value: '₹750'},
              ],
            },
            {
              id: '2',
              title: 'HDFC Bank',
              image: 'https://i.pravatar.cc/150?img=3',
              interestRate: 11.5,
              isEligible: false,
              badge: 2,
              footerInfo: [
                {label: 'Tenure', value: '12M'},
                {label: 'EMI', value: '₹6,300'},
                {label: 'Processing Fee', value: '₹500'},
              ],
            },
            {
              id: '3',
              title: 'ICICI',
              interestRate: 9.8,
              isEligible: true,
              badge: 3,
              image: 'https://i.pravatar.cc/150?img=3',
              footerInfo: [
                {label: 'Tenure', value: '36M'},
                {label: 'EMI', value: '₹4,200'},
                {label: 'Processing Fee', value: '₹600'},
              ],
            },
          ]}
        />
      </>
    );
  }
}

export default ApplicationsScreen;
