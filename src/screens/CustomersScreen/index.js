import React, {Component} from 'react';
import Customers_Component from './Customers_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class CustomersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [
        {
          id: '1',
          applicationNumber: 'SAVED',
          customerId: '#21f2f22',
          customerName: 'Nirmal Nagarajan',
          customerNote: 'Individual - Salaried',
          profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
          footerInfo: [
            {label: 'PAN Card', value: 'HJOKP7684N'},
            {label: 'Aadhar Card', value: '8752 8752 7580'},
          ],
        },
        {
          id: '2',
          applicationNumber: 'DRAFT',
          customerId: '#32d2f32',
          customerName: 'Rohit Sharma',
          customerNote: 'Self Employed',
          profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
          footerInfo: [
            {label: 'PAN Card', value: 'BSHPS1929Q'},
            {label: 'Aadhar Card', value: '1234 5678 9012'},
          ],
        },
        {
          id: '3',
          applicationNumber: 'SAVED',
          customerId: '#98y7t6w1',
          customerName: 'Anita Desai',
          customerNote: 'Individual - Salaried',
          profileImage: 'https://randomuser.me/api/portraits/women/55.jpg',
          footerInfo: [
            {label: 'PAN Card', value: 'DKJQP9584K'},
            {label: 'Aadhar Card', value: '9988 7766 5544'},
          ],
        },
        {
          id: '4',
          applicationNumber: 'DRAFT',
          customerId: '#aa99tt88',
          customerName: 'Sundar Raj',
          customerNote: 'Business Owner',
          profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
          footerInfo: [
            {label: 'PAN Card', value: 'TYRPS8855M'},
            {label: 'Aadhar Card', value: '4567 7890 1234'},
          ],
        },
      ],
    };
    this.onWrapperClick = this.onWrapperClick.bind(this);
  }

  onWrapperClick = item => {
    navigate(ScreenNames.CustomerInfo, {param: item});
  };

  render() {
    return (
      <>
        <Customers_Component
          customerList={this.state.customerList}
          onWrapperClick={this.onWrapperClick}
        />
      </>
    );
  }
}

export default CustomersScreen;
