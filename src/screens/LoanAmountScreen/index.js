import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import {addCustomerLoanAmountThunk} from '../../redux/actions';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Loan_Amount_Component from './Loan_Amount_Component';
import strings from '../../locales/strings';
import {Alert} from 'react-native';
import {MIN_LOAN_AMOUNT} from '../../constants/enums';

class LoanAmountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: '',
      error: {loanAmount: ''},
      isFormValid: false,
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };
    this.onNextButtonPress = this.onNextButtonPress.bind(this);
  }

  componentDidMount() {
    const {isEdit} = this.state;
    const {selectedLoanApplication} = this.props;
    if (isEdit) {
      this.setState({
        loanAmount: selectedLoanApplication?.loanAmount,
      });
    }
  }

  onNextButtonPress = () => {
    const {loanAmount} = this.state;

    const {selectedApplicationId, isReadOnlyLoanApplication} = this.props;

    let params = getScreenParam(this.props.route, 'params');

    if (isReadOnlyLoanApplication) {
      return navigate(ScreenNames.AddReference, {params});
    }

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', strings.errorMissingField, 'bottom', 3000);
      return;
    }

    if (loanAmount < MIN_LOAN_AMOUNT) {
      this.setState({
        errors: {
          loanAmount: `The loan amount entered is below the minimum limit. Please enter at least ₹${MIN_LOAN_AMOUNT}.`,
        },
      });
      return;
    }

    let payload = {loanAmount};

    this.props.addCustomerLoanAmountThunk(
      payload,
      selectedApplicationId,
      success => {
        navigate(ScreenNames.CreateCIBILScreen, {params});
      },
      error => {},
    );
  };

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  validateAllFields = () => {
    const fieldsToValidate = ['loanAmount'];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key] + '';

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
    const {loanAmount, errors, isEdit} = this.state;

    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
      isReadOnlyLoanApplication,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};

    return (
      <Loan_Amount_Component
        headerProp={{
          title: `${
            isEdit && !isReadOnlyLoanApplication ? 'Edit ' : ''
          }Loan Amount`,
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
        onNextButtonPress={this.onNextButtonPress}
        onChangeLoanAmount={value => this.onChangeField('loanAmount', value)}
        loanAmount={loanAmount}
        restInputProps={{
          loanAmount: {
            isError: errors?.loanAmount,
            statusMsg: errors?.loanAmount,
            isDisabled: isReadOnlyLoanApplication,
          },
        }}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {addCustomerLoanAmountThunk};

const mapStateToProps = ({loanData, customerData, vehicleData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  isReadOnlyLoanApplication: loanData?.isReadOnlyLoanApplication,
});

export default connect(mapStateToProps, mapActionCreators)(LoanAmountScreen);
