import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import Notification_Component from './Notification_Component';
import {goBack} from '../../navigation/NavigationUtils';

class NotificationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          status: 'success',
          isLatest: true,
          minutesAgo: '2 Mins ago',
          description: 'Kotak bank has approved the loan request for #XBD123',
        },
        {
          status: 'pending',
          isLatest: false,
          minutesAgo: '15 Mins ago',
          description: 'Loan request #XYZ789 is under review by Axis bank',
        },
        {
          status: 'rejected',
          isLatest: false,
          minutesAgo: '30 Mins ago',
          description: 'ICICI bank has rejected the application #LMN456',
        },
        {
          status: 'success',
          isLatest: false,
          minutesAgo: '5 Mins ago',
          description: 'HDFC approved your credit increase request #HDFC001',
        },
        {
          status: 'pending',
          isLatest: true,
          minutesAgo: '1 Mins ago',
          description: 'Verification pending for request #VFY234 at SBI',
        },
        {
          status: 'rejected',
          isLatest: false,
          minutesAgo: '50 Mins ago',
          description: 'Loan request #TRF567 was declined by Yes Bank',
        },
      ],
    };
    this.onBackPress = this.onBackPress.bind(this);
    this.onPressRightContent = this.onPressRightContent.bind(this);
  }

  onBackPress = () => {
    goBack();
  };

  onPressRightContent = () => {
    Alert.alert('Mark as Read Click');
  };

  render() {
    const {notifications} = this.state;
    return (
      <>
        <Notification_Component
          dataList={notifications}
          onBackPress={this.onBackPress}
          onPressRightContent={this.onPressRightContent}
        />
      </>
    );
  }
}

export default NotificationView;
