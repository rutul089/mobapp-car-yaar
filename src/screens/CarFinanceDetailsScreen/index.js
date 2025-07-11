import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import CarFinance_Details_Component from './CarFinance_Details_Component';

class CarFinanceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: '',
      loanAccountNumber: '',
      loanAmount: '',
      monthlyEmi: '',
      emiPaid: '',
      tenure: '',
      loanClosedDate: '',
      bankNameValue: '',
      errors: {
        bankName: '',
        loanAccountNumber: '',
        loanAmount: '',
        monthlyEmi: '',
        emiPaid: '',
        tenure: '',
        bankNameValue: '',
      },
      isFormValid: false,
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };
    this.handleSaveDraftPress = this.handleSaveDraftPress.bind(this);
    this.handleNextStepPress = this.handleNextStepPress.bind(this);
  }

  async componentDidMount() {
    const {isEdit} = this.state;
    const {selectedApplicationId} = this.props;

    if (isEdit) {
      await this.props.fetchCustomerFinanceDetailsThunk(
        selectedApplicationId,
        {},
        response => {
          this.setState({
            bankName: response?.bankName || '',
            bankNameValue: response?.bankName || '',
            loanAccountNumber: response?.loanAccountNumber?.toString() || '',
            loanAmount: response?.loanAmount?.toString(),
            tenure: response?.tenure?.toString() || '-',
            monthlyEmi: response?.monthlyEmi?.toString() || '',
            emiPaid: response?.emiPaid.toString() || '',
          });
        },
      );
    }
  }

  handleNextStepPress = () => {
    const {selectedApplicationId, isReadOnlyLoanApplication, route} =
      this.props;

    const {
      bankName,
      loanAccountNumber,
      loanAmount,
      monthlyEmi,
      emiPaid,
      tenure,
    } = this.state;

    const goToFinanceDocuments = () => {
      const params = getScreenParam(route, 'params');
      navigate(ScreenNames.FinanceDocuments, {params});
    };

    if (isReadOnlyLoanApplication) {
      goToFinanceDocuments();

      return;
    }

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }

    let payLoad = {
      isCarFinanced: false,
      bankName: bankName,
      loanAccountNumber: String(loanAccountNumber),
      loanAmount: Number(loanAmount),
      monthlyEmi: Number(monthlyEmi),
      emiPaid: Number(emiPaid),
      tenure: Number(tenure),
    };

    this.props.postCustomerFinanceDetailsThunk(
      selectedApplicationId,
      payLoad,
      response => {
        goToFinanceDocuments();
      },
      error => {},
    );

    // navigate(ScreenNames.TopUpFinanceDocuments);
  };

  handleSaveDraftPress = () => {};

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  onSelectBank = (item, index) => {
    this.onChangeField('bankName', item?.bank);
    this.onChangeField('bankNameValue', item?.bank);
  };

  searchBankNameFromAPI = async query => {
    this.onChangeField('bankName', query);
    this.onChangeField('bankNameValue', '');
    let searchResult = [];
    await this.props.searchBanksThunk(
      query,
      onSuccess => {
        searchResult = onSuccess;
        if (Array.isArray(searchResult) && searchResult.length === 0) {
          this.onChangeField('bankNameValue', '');
        }
      },
      error => {
        return [];
      },
    );
    return searchResult;
  };

  validateAllFields = () => {
    const fieldsToValidate = [
      'bankName',
      'loanAccountNumber',
      'loanAmount',
      'monthlyEmi',
      'emiPaid',
      'tenure',
      'bankNameValue',
    ];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];

      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  selectTenure = (item, index) => {
    this.setState(
      {
        tenure: item.value,
      },
      () => {
        this.onChangeField('tenure', String(this.state.tenure));
      },
    );
  };

  selectEmiPaid = (item, index) => {
    this.setState(
      {
        emiPaid: item.label,
      },
      () => {
        this.onChangeField('emiPaid', this.state.emiPaid);
      },
    );
  };

  render() {
    const {
      bankName,
      loanAccountNumber,
      loanAmount,
      monthlyEmi,
      emiPaid,
      tenure,
      errors,
      isEdit,
      bankNameValue,
    } = this.state;

    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
      isReadOnlyLoanApplication,
    } = this.props;

    const {UsedVehicle = {}} = selectedVehicle || {};
    return (
      <CarFinance_Details_Component
        headerProp={{
          title: 'Car Finance Details',
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
          bankName,
          loanAccountNumber,
          loanAmount,
          monthlyEmi,
          emiPaid,
          tenure,
        }}
        tenure={tenure}
        onBankNameChange={value => this.onChangeField('bankName', value)}
        onSelectSuggestion={this.onSelectBank}
        isCreatingLoanApplication={isCreatingLoanApplication}
        searchBankNameFromAPI={this.searchBankNameFromAPI}
        loading={loading}
        onChangeAccountNumber={value =>
          this.onChangeField('loanAccountNumber', value)
        }
        onChangeLoanAmount={value => this.onChangeField('loanAmount', value)}
        onChangeTenure={value => this.onChangeField('tenure', value)}
        onChangeEmiPaid={value => this.onChangeField('emiPaid', value)}
        onChangeMonthlyAmount={value => this.onChangeField('monthlyEmi', value)}
        restInputProps={{
          bankName: {
            value: bankName,
            isError: errors.bankName || errors.bankNameValue,
            statusMsg: errors.bankName || errors.bankNameValue,
            isDisabled: isReadOnlyLoanApplication,
          },
          loanAccountNumber: {
            value: loanAccountNumber,
            isError: errors.loanAccountNumber,
            statusMsg: errors.loanAccountNumber,
            isDisabled: isReadOnlyLoanApplication,
          },
          loanAmount: {
            isError: errors.loanAmount,
            statusMsg: errors.loanAmount,
            isDisabled: isReadOnlyLoanApplication,
          },
          tenure: {
            isError: errors.tenure,
            statusMsg: errors.tenure,
            isDisabled: isReadOnlyLoanApplication,
          },
          monthlyEmi: {
            isError: errors.monthlyEmi,
            statusMsg: errors.monthlyEmi,
            isDisabled: isReadOnlyLoanApplication,
          },
          emiPaid: {
            isError: errors.emiPaid,
            statusMsg: errors.emiPaid,
            isDisabled: isReadOnlyLoanApplication,
          },
        }}
        handleNextStepPress={this.handleNextStepPress}
        handleSaveDraftPress={this.handleSaveDraftPress}
        selectTenure={this.selectTenure}
        selectEmiPaid={this.selectEmiPaid}
      />
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
  isReadOnlyLoanApplication: loanData?.isReadOnlyLoanApplication,
});

export default connect(mapStateToProps, mapActionCreators)(CarFinanceDetails);
