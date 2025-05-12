import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customer_Info_Component from './Customer_Info_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import {formatIndianNumber} from '../../utils/helper';
import {Alert} from 'react-native';
import ScreenNames from '../../constants/ScreenNames';

class CustomerInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerInfo: {},
    };
    this.onNextPress = this.onNextPress.bind(this);
    this.handleEditDetailPress = this.handleEditDetailPress.bind(this);
    this.viewIncomeProof = this.viewIncomeProof.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let customerInfo = getScreenParam(route, 'param');
    this.setState(
      {
        customerInfo,
      },
      () => {
        console.log({customerInfo: this.state.customerInfo});
      },
    );
  }

  onNextPress = () => {
    navigate(ScreenNames.CustomerDocuments);
  };

  handleEditDetailPress = () => {
    Alert.alert('handleEditDetailPress');
  };

  viewIncomeProof = () => {
    Alert.alert('viewIncomeProof');
  };

  render() {
    return (
      <>
        <Customer_Info_Component
          state={this.state}
          customerInfo={this.state.customerInfo}
          personalDetail={[
            {label: 'Mobile Number', value: '98653 90981'},
            {label: 'Gender', value: 'Male'},
            {label: 'Father/Mother Name', value: 'Jyotiben Nayak'},
            {label: 'Spouse Name', value: 'Suresh Nayak'},
            {
              label: 'Email address',
              value: 'aayushman_nayak85@gmail.com',
              full: true,
            },
            {label: 'Date of Birth', value: '13 Aug 1993', full: true},
            {
              label: 'Current Address',
              value: '84, MadhaviGarh, Rehman Nagar',
              full: true,
            },
            {label: 'Current Pincode', value: '255488 - Ahmedabad'},
          ]}
          professionalDetails={[
            {label: 'Occupation', value: 'Other'},
            {label: 'Income Source', value: 'Salaried'},
            {label: 'Monthly Income', value: formatIndianNumber(41000)},
          ]}
          bankDetails={[
            {label: 'Bank Name', value: 'HDFC Bank'},
            {label: 'Account Number', value: '5984075872581'},
            {label: 'Current Loan?', value: 'Yes'},
            {label: 'Current EMI', value: formatIndianNumber(10000)},
            {label: 'Max EMI Afford', value: formatIndianNumber(12231.12)},
            {label: 'Avg Monthly Bank Bal', value: formatIndianNumber(1231.23)},
            {
              label: 'Income Proof',
              value: 'VIEW',
              isButton: true,
              onPress: this.viewIncomeProof,
            },
          ]}
          onNextPress={this.onNextPress}
          handleEditDetailPress={this.handleEditDetailPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(CustomerInfoScreen);
