import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import Customer_Personal_Details_Component from './Customer_Personal_Details_Component';
import {currentLoanOptions, gender} from '../../constants/enums';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class CustomerPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGender: gender.male,
      panCardNumber: '',
      aadharNumber: '',
      applicantName: '',
      mobileNumber: '',
      fatherMotherName: '',
      spouseName: '',
      email: '',
      dob: '',
      currentAddress: '',
      currentPincode: '',
      currentState: 'GUJ',
      selectedLoanOption: currentLoanOptions.no,
      occupation: '',
      incomeSource: '',
      monthlyIncome: '',
      bankName: '',
      accountNumber: '',
      currentEMI: '',
      maxEMIAfford: '',
      monthlyBankBalance: '',
      occupationOptions: [
        {label: 'Salaried', value: 'salaried'},
        {label: 'Self Employed', value: 'self_employed'},
        {label: 'Business', value: 'business'},
        {label: 'Student', value: 'student'},
        {label: 'Retired', value: 'retired'},
        {label: 'Homemaker', value: 'homemaker'},
        {label: 'Unemployed', value: 'unemployed'},
        {label: 'Freelancer', value: 'freelancer'},
        {label: 'Government Employee', value: 'government_employee'},
        {label: 'Private Sector Employee', value: 'private_sector'},
      ],
      incomeSourceOptions: [
        {label: 'Salary', value: 'salary'},
        {label: 'Business', value: 'business'},
        {label: 'Freelancing', value: 'freelancing'},
        {label: 'Rental Income', value: 'rental'},
        {label: 'Investment', value: 'investment'},
        {label: 'Pension', value: 'pension'},
        {label: 'Other', value: 'other'},
      ],
      bankOptions: [
        {label: 'HDFC Bank', value: 'hdfc'},
        {label: 'ICICI Bank', value: 'icici'},
        {label: 'State Bank of India', value: 'sbi'},
        {label: 'Axis Bank', value: 'axis'},
      ],
    };
    this.onSelectedGender = this.onSelectedGender.bind(this);
    this.onChangePanCardNumber = this.onChangePanCardNumber.bind(this);
    this.onChangeAadharNumber = this.onChangeAadharNumber.bind(this);
    this.onChangeApplicantName = this.onChangeApplicantName.bind(this);
    this.onChangemobileNumber = this.onChangemobileNumber.bind(this);
    this.onChangeFatherMotherName = this.onChangeFatherMotherName.bind(this);
    this.onChangeSpouseName = this.onChangeSpouseName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCurrentAddress = this.onChangeCurrentAddress.bind(this);
    this.onChangeCurrentPincode = this.onChangeCurrentPincode.bind(this);
    this.onSelectedLoanOption = this.onSelectedLoanOption.bind(this);
    this.onSelectedOccupation = this.onSelectedOccupation.bind(this);
    this.onSelectBankOption = this.onSelectBankOption.bind(this);
    this.onSelectIncomeSourceOption =
      this.onSelectIncomeSourceOption.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  onFormChange = (key, value, callback) => {
    this.setState(
      {
        [key]: value,
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
    );
  };

  onSelectedGender = value => {
    this.onFormChange('selectedGender', value);
  };

  onChangePanCardNumber = value => {
    this.onFormChange('panCardNumber', value);
  };
  onChangeAadharNumber = value => {
    this.onFormChange('aadharNumber', value);
  };
  onChangeApplicantName = value => {
    this.onFormChange('applicantName', value);
  };
  onChangemobileNumber = value => {
    this.onFormChange('mobileNumber', value);
  };
  onChangeFatherMotherName = value => {
    this.onFormChange('fatherMotherName', value);
  };
  onChangeSpouseName = value => {
    this.onFormChange('spouseName', value);
  };
  onChangeEmail = value => {
    this.onFormChange('email', value);
  };
  onChangeCurrentAddress = value => {
    this.onFormChange('currentAddress', value);
  };
  onChangeCurrentPincode = value => {
    this.onFormChange('currentPincode', value);
  };

  onSelectedLoanOption = value => {
    this.onFormChange('selectedLoanOption', value);
  };

  onSelectedOccupation = (value, index) => {
    this.onFormChange('occupation', value);
  };

  onSelectIncomeSourceOption = (value, index) => {
    this.onFormChange('incomeSource', value);
  };

  onSelectBankOption = (value, index) => {
    this.onFormChange('bankName', value);
  };

  onNextPress = () => {
    navigate(ScreenNames.LoanDocument);
  };

  render() {
    const {selectedGender} = this.state;
    return (
      <>
        <Customer_Personal_Details_Component
          state={this.state}
          onSelectedGender={this.onSelectedGender}
          selectedGender={selectedGender}
          genderOptions={[
            {label: 'Male', value: gender.male},
            {label: 'Female', value: gender.female},
          ]}
          onChangePanCardNumber={this.onChangePanCardNumber}
          onChangeAadharNumber={this.onChangeAadharNumber}
          onChangeApplicantName={this.onChangeApplicantName}
          onChangemobileNumber={this.onChangemobileNumber}
          onChangeFatherMotherName={this.onChangeFatherMotherName}
          onChangeSpouseName={this.onChangeSpouseName}
          onChangeEmail={this.onChangeEmail}
          onChangeCurrentAddress={this.onChangeCurrentAddress}
          onChangeCurrentPincode={this.onChangeCurrentPincode}
          currentLoanOptions={[
            {label: 'Yes', value: currentLoanOptions.yes},
            {label: 'No', value: currentLoanOptions.no},
          ]}
          onSelectedLoanOption={this.onSelectedLoanOption}
          onSelectedOccupation={this.onSelectedOccupation}
          onSelectIncomeSourceOption={this.onSelectIncomeSourceOption}
          onSelectBankOption={this.onSelectBankOption}
          onNextPress={this.onNextPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(CustomerPersonalDetails);
