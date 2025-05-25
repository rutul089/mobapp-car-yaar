import React, {Component} from 'react';
import {connect} from 'react-redux';
import Finance_Details_Component from './Finance_Details_Component';
import {currentLoanOptions} from '../../constants/enums';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {
  convertToISODate,
  formatVehicleNumber,
  showToast,
} from '../../utils/helper';
import {
  postCustomerFinanceDetailsThunk,
  searchBanksThunk,
} from '../../redux/actions';
import {handleFieldChange, validateField} from '../../utils/inputHelper';

class FinanceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCarFinanced: currentLoanOptions.YES,
      bankName: '',
      loanAccountNumber: '',
      loanAmount: '',
      monthlyEmi: '',
      emiPaid: '',
      tenure: '',
      loanClosedDate: '',
      errors: {
        bankName: '',
        loanAccountNumber: '',
        loanAmount: '',
        monthlyEmi: '',
        emiPaid: '',
        tenure: '',
        loanClosedDate: '',
      },
      isFormValid: false,
    };
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.saveAsDraftPress = this.saveAsDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {}

  onSelectAnswer = value => {
    this.onChangeField('isCarFinanced', value);
  };

  saveAsDraftPress = () => {};

  onNextPress = () => {
    const {selectedApplicationId} = this.props;

    const {
      isCarFinanced,
      bankName,
      loanAccountNumber,
      loanAmount,
      monthlyEmi,
      emiPaid,
      tenure,
      loanClosedDate,
    } = this.state;

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    let payLoad = {
      isCarFinanced: isCarFinanced,
      bankName: isCarFinanced ? bankName : '',
      loanAccountNumber: isCarFinanced ? Number(loanAccountNumber) : '',
      loanAmount: isCarFinanced ? Number(loanAmount) : '',
      monthlyEmi: isCarFinanced ? Number(monthlyEmi) : '',
      emiPaid: isCarFinanced ? Number(emiPaid) : '',
      tenure: isCarFinanced ? Number(tenure) : '',
      loanClosedDate: isCarFinanced ? convertToISODate(loanClosedDate) : '',
    };

    this.props.postCustomerFinanceDetailsThunk(
      selectedApplicationId,
      payLoad,
      response => {
        navigate(ScreenNames.FinanceDocuments);
      },
      error => {},
    );
  };

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  onSelectBank = (item, index) => {
    this.onChangeField('bankName', item?.bank);
  };

  searchBankNameFromAPI = async query => {
    this.onChangeField('bankName', query);
    let searchResult = [];
    await this.props.searchBanksThunk(
      query,
      onSuccess => {
        searchResult = onSuccess;
        if (Array.isArray(searchResult) && searchResult.length === 0) {
          this.onChangeField('bankName', '');
        }
      },
      error => {
        return [];
      },
    );
    return searchResult;
  };

  validateAllFields = () => {
    const {isCarFinanced} = this.state;
    const fieldValidationRules = {
      loanClosedDate: {required: isCarFinanced},
      bankName: {required: isCarFinanced},
      loanAccountNumber: {required: isCarFinanced},
      monthlyEmi: {required: isCarFinanced},
      loanAmount: {required: isCarFinanced},
      tenure: {required: isCarFinanced},
      emiPaid: {required: isCarFinanced},
    };

    const fieldsToValidate = [
      'isCarFinanced',
      'bankName',
      'loanAccountNumber',
      'loanAmount',
      'monthlyEmi',
      'emiPaid',
      'tenure',
      'loanClosedDate',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];
      const {required = true} = fieldValidationRules[key] || {};

      // Skip validation if field is optional and empty
      if (!required) {
        errors[key] = '';
        return;
      }

      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  render() {
    const {
      isCarFinanced,
      bankName,
      loanAccountNumber,
      loanAmount,
      monthlyEmi,
      emiPaid,
      tenure,
      loanClosedDate,
      errors,
    } = this.state;

    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
    } = this.props;

    const {UsedVehicle = {}} = selectedVehicle || {};

    return (
      <>
        <Finance_Details_Component
          headerProp={{
            title: 'Finance Details',
            subtitle: isCreatingLoanApplication
              ? formatVehicleNumber(UsedVehicle?.registerNumber)
              : '',
            showRightContent: true,
            rightLabel: isCreatingLoanApplication
              ? selectedLoanApplication?.loanApplicationId || ''
              : '',
            rightLabelColor: '#F8A902',
            onBackPress: () => goBack(),
          }}
          state={{
            isCarFinanced,
            bankName,
            loanAccountNumber,
            loanAmount,
            monthlyEmi,
            emiPaid,
            tenure,
            loanClosedDate,
          }}
          onBankNameChange={value => this.onChangeField('bankName', value)}
          onSelectSuggestion={this.onSelectBank}
          onSelectAnswer={this.onSelectAnswer}
          saveAsDraftPress={this.saveAsDraftPress}
          onNextPress={this.onNextPress}
          isCreatingLoanApplication={isCreatingLoanApplication}
          searchBankNameFromAPI={this.searchBankNameFromAPI}
          loading={loading}
          onChangeAccountNumber={value =>
            this.onChangeField('loanAccountNumber', value)
          }
          onChangeLoanAmount={value => this.onChangeField('loanAmount', value)}
          onChangeTenure={value => this.onChangeField('tenure', value)}
          onChangeMonthlyAmount={value =>
            this.onChangeField('monthlyEmi', value)
          }
          onChangeLoanClosedDate={value =>
            this.onChangeField('loanClosedDate', value)
          }
          restInputProps={{
            bankName: {
              value: bankName,
              isError: errors.bankName,
              statusMsg: errors.bankName,
            },
            loanAccountNumber: {
              value: loanAccountNumber,
              isError: errors.loanAccountNumber,
              statusMsg: errors.loanAccountNumber,
            },
            loanAmount: {
              isError: errors.loanAmount,
              statusMsg: errors.loanAmount,
            },
            tenure: {
              isError: errors.tenure,
              statusMsg: errors.tenure,
            },
            monthlyEmi: {
              isError: errors.monthlyEmi,
              statusMsg: errors.monthlyEmi,
            },
            loanClosedDate: {
              isError: errors.loanClosedDate,
              statusMsg: errors.loanClosedDate,
            },
          }}
        />
      </>
    );
  }
}

const mapActionCreators = {searchBanksThunk, postCustomerFinanceDetailsThunk};

const mapStateToProps = ({loanData, customerData, vehicleData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  selectedCustomer: loanData?.selectedCustomer,
});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(FinanceDetailsScreen);
