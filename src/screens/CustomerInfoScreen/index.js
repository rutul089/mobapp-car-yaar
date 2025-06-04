import {get} from 'lodash';
import React, {Component} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {getLabelFromEnum, occupationLabelMap} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import {
  fetchCustomerDetailsThunk,
  initiateLoanApplicationThunk,
} from '../../redux/actions';
import {
  capitalizeFirstLetter,
  formatDate,
  formatIndianCurrency,
} from '../../utils/helper';
import Customer_Info_Component from './Customer_Info_Component';

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
    const {isCreatingLoanApplication} = this.props;
    isCreatingLoanApplication
      ? this.createLoanApplication()
      : navigate(ScreenNames.CustomerDocuments);
  };

  handleEditDetailPress = () => {
    navigate(ScreenNames.CustomerPersonalDetails, {
      params: {
        fromScreen: ScreenNames.CustomerInfo,
        isEdit: true,
      },
    });
  };

  viewIncomeProof = () => {
    Alert.alert('viewIncomeProof');
  };

  safeGet = (obj, path) => {
    return this.props.loading ? '-' : get(obj, path, '-');
  };

  createLoanApplication = () => {
    const {vehicleId, loanType, selectedCustomerId} = this.props;

    let payload = {
      vehicleId,
      loanType,
      customerId: selectedCustomerId,
    };

    this.props.initiateLoanApplicationThunk(
      payload,
      success => {
        navigate(ScreenNames.LoanDocument);
      },
      error => {},
    );
  };

  render() {
    const {loading, selectedCustomer, isCreatingLoanApplication} = this.props;
    const {details = {}} = selectedCustomer || {};

    let customerNote = `${capitalizeFirstLetter(
      selectedCustomer?.customerCategory,
    )} - ${capitalizeFirstLetter(selectedCustomer?.customerType)}`;

    let dob = this.safeGet(details, 'dob');
    let applicantPhoto = this.safeGet(details, 'applicantPhoto');

    const isValidUri =
      applicantPhoto?.startsWith('http') ||
      applicantPhoto?.startsWith('https') ||
      applicantPhoto?.startsWith('file://');

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
              formatIndianCurrency(this.safeGet(details, 'currentEmi') + '') ||
              '-',
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
        isCreatingLoanApplication={isCreatingLoanApplication}
      />
    );
  }
}

const mapActionCreators = {
  fetchCustomerDetailsThunk,
  initiateLoanApplicationThunk,
};
const mapStateToProps = ({customerData, loanData, vehicleData}) => {
  return {
    selectedCustomerId: customerData?.selectedCustomerId,
    selectedCustomer: customerData?.selectedCustomer,
    loading: customerData?.loading || loanData?.loading,
    isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
    vehicleId: vehicleData?.selectedVehicle?.id,
    loanType: loanData?.selectedLoanType,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomerInfoScreen);
