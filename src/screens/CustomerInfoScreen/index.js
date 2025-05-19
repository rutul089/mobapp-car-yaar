import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customer_Info_Component from './Customer_Info_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import {
  capitalizeFirstLetter,
  formatDate,
  formatIndianCurrency,
} from '../../utils/helper';
import {Alert} from 'react-native';
import ScreenNames from '../../constants/ScreenNames';
import {fetchCustomerDetailsThunk} from '../../redux/actions';
import {get} from 'lodash';
import {
  getLabelEnum,
  getLabelFromEnum,
  occupationLabelMap,
} from '../../constants/enums';

class CustomerInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerInfo: {},
      customerId: getScreenParam(this.props.route, 'param')?.id,
    };
    this.onNextPress = this.onNextPress.bind(this);
    this.handleEditDetailPress = this.handleEditDetailPress.bind(this);
    this.viewIncomeProof = this.viewIncomeProof.bind(this);
  }

  componentDidMount() {
    this.fetchCustomerDetailsThunk();
  }

  fetchCustomerDetailsThunk = () => {
    const {customerId} = this.state;
    this.props.fetchCustomerDetailsThunk(customerId);
  };

  onNextPress = () => {
    navigate(ScreenNames.CustomerDocuments);
  };

  handleEditDetailPress = () => {
    Alert.alert('handleEditDetailPress');
  };

  viewIncomeProof = () => {
    Alert.alert('viewIncomeProof');
  };

  safeGet = (obj, path) => {
    return this.props.loading ? '-' : get(obj, path, '-');
  };

  render() {
    const {loading, selectedCustomer} = this.props;
    const {details = {}} = selectedCustomer || {};

    let customerNote = `${capitalizeFirstLetter(
      selectedCustomer?.customerCategory,
    )} - ${capitalizeFirstLetter(selectedCustomer?.customerType)}`;

    let dob = this.safeGet(details, 'dob');
    let applicantPhoto = this.safeGet(details, 'applicantPhoto');

    const isValidUri =
      applicantPhoto?.startsWith('http') || applicantPhoto?.startsWith('https');

    const occupation = this.safeGet(details, 'occupation');

    return (
      <Customer_Info_Component
        state={this.state}
        customerInfo={{
          customerName: this.safeGet(details, 'applicantName'),
          customerNote: customerNote,
          footerInfo: [
            {
              label: 'PAN Card',
              value: this.safeGet(details, 'panCardNumber') || '-',
            },
            {
              label: 'Aadhar Card',
              value: this.safeGet(details, 'aadharNumber') || '-',
            },
          ],
          profileImage: applicantPhoto,
          isValidUri: isValidUri,
        }}
        personalDetail={[
          {
            label: 'Mobile Number',
            value: this.safeGet(details, 'mobileNumber'),
          },
          {label: 'Gender', value: this.safeGet(details, 'gender')},
          {
            label: 'Father/Mother Name',
            value: this.safeGet(details, 'fatherName'),
          },
          {label: 'Spouse Name', value: this.safeGet(details, 'spouseName')},
          {
            label: 'Email address',
            value: this.safeGet(details, 'email'),
            full: true,
          },
          {label: 'Date of Birth', value: formatDate(dob), full: true},
          {
            label: 'Current Address',
            value: this.safeGet(details, 'address'),
            full: true,
          },
          {label: 'Current Pincode', value: this.safeGet(details, 'pincode')},
        ]}
        professionalDetails={[
          {
            label: 'Occupation',
            value:
              getLabelFromEnum(occupationLabelMap, occupation) || occupation,
          },
          {
            label: 'Income Source',
            value: this.safeGet(details, 'incomeSource'),
          },
          {
            label: 'Monthly Income',
            value:
              formatIndianCurrency(
                this.safeGet(details, 'monthlyIncome'),
                true,
                true,
              ) || '-',
          },
        ]}
        bankDetails={[
          {label: 'Bank Name', value: this.safeGet(details, 'bankName')},
          {
            label: 'Account Number',
            value: this.safeGet(details, 'accountNumber'),
          },
          {
            label: 'Current Loan?',
            value: this.safeGet(details, 'currentLoan') ? 'Yes' : 'No',
          },
          {
            label: 'Current EMI',
            value:
              formatIndianCurrency(this.safeGet(details, 'currentEmi')) || '-',
          },
          {
            label: 'Max EMI Afford',
            value:
              formatIndianCurrency(this.safeGet(details, 'maxEmiAfford')) ||
              '-',
          },
          {
            label: 'Avg Monthly Bank Bal',
            value:
              formatIndianCurrency(
                this.safeGet(details, 'avgMonthlyBankBalance'),
              ) || '-',
          },
          {
            label: 'Income Proof',
            value: 'VIEW',
            isButton: true,
            onPress: this.viewIncomeProof,
          },
        ]}
        onNextPress={this.onNextPress}
        handleEditDetailPress={this.handleEditDetailPress}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {fetchCustomerDetailsThunk};
const mapStateToProps = ({customerData}) => {
  return {
    selectedCustomerId: customerData?.selectedCustomerId,
    selectedCustomer: customerData?.selectedCustomer,
    loading: customerData?.loading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomerInfoScreen);
