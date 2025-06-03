import React, {Component} from 'react';
import {connect} from 'react-redux';
import CarFinance_Details_Component from './CarFinance_Details_Component';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {
  fetchCustomerFinanceDetailsThunk,
  postCustomerFinanceDetailsThunk,
  searchBanksThunk,
} from '../../redux/actions';
import {formatVehicleNumber, showToast} from '../../utils/helper';

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
      errors: {
        bankName: '',
        loanAccountNumber: '',
        loanAmount: '',
        monthlyEmi: '',
        emiPaid: '',
        tenure: '',
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
            loanAccountNumber: response?.loanAccountNumber?.toString() || '',
            loanAmount: response?.loanAmount?.toString(),
            tenure: response?.tenure?.toString() || '',
            monthlyEmi: response?.monthlyEmi?.toString() || '',
            emiPaid: response?.emiPaid.toString() || '',
          });
        },
      );
    }
  }

  handleNextStepPress = () => {
    const {selectedApplicationId} = this.props;

    const {
      bankName,
      loanAccountNumber,
      loanAmount,
      monthlyEmi,
      emiPaid,
      tenure,
    } = this.state;

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
        let params = getScreenParam(this.props.route, 'params');
        navigate(ScreenNames.FinanceDocuments, {params});
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
    const fieldsToValidate = [
      'bankName',
      'loanAccountNumber',
      'loanAmount',
      'monthlyEmi',
      'emiPaid',
      'tenure',
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
          onChangeMonthlyAmount={value =>
            this.onChangeField('monthlyEmi', value)
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
            emiPaid: {
              isError: errors.emiPaid,
              statusMsg: errors.emiPaid,
            },
          }}
          handleNextStepPress={this.handleNextStepPress}
          handleSaveDraftPress={this.handleSaveDraftPress}
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

export default connect(mapStateToProps, mapActionCreators)(CarFinanceDetails);
