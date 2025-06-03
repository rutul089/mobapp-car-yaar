import React, {Component} from 'react';
import {connect} from 'react-redux';
import {currentLoanOptions} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {
  fetchCustomerFinanceDetailsThunk,
  postCustomerFinanceDetailsThunk,
  searchBanksThunk,
} from '../../redux/actions';
import {
  convertToISODate,
  formatDate,
  formatVehicleNumber,
  showToast,
} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Finance_Details_Component from './Finance_Details_Component';

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
        tenure: '',
        loanClosedDate: '',
      },
      isFormValid: false,
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.saveAsDraftPress = this.saveAsDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  async componentDidMount() {
    const {isEdit} = this.state;
    const {selectedLoanApplication, selectedApplicationId, financeDetails} =
      this.props;
    if (isEdit) {
      await this.props.fetchCustomerFinanceDetailsThunk(
        selectedApplicationId,
        {},
        response => {
          this.setState({
            isCarFinanced: response?.isCarFinanced,
            bankName: response?.bankName,
            loanAccountNumber: response?.loanAccountNumber,
            loanAmount: response?.loanAmount + '',
            tenure: response?.tenure + '',
            monthlyEmi: response?.monthlyEmi + '',
            loanClosedDate: formatDate(response?.loanClosedDate, 'DD/MM/yyyy'),
          });
        },
      );
    }
  }

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
      loanAccountNumber: isCarFinanced ? String(loanAccountNumber) : '',
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
        let params = getScreenParam(this.props.route, 'params');
        navigate(ScreenNames.FinanceDocuments, {params});
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
      isEdit,
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
            rightLabel:
              isCreatingLoanApplication || isEdit
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

const mapActionCreators = {
  searchBanksThunk,
  postCustomerFinanceDetailsThunk,
  fetchCustomerFinanceDetailsThunk,
};

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
  financeDetails: loanData?.financeDetails,
});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(FinanceDetailsScreen);
