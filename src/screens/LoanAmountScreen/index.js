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
    console.log(
      'selectedLoanApplication',
      JSON.stringify(selectedLoanApplication),
    );
  }

  onNextButtonPress = () => {
    const {loanAmount} = this.state;
    const {selectedApplicationId} = this.props;
    const isFormValid = this.validateAllFields();
    let params = getScreenParam(this.props.route, 'params');
    console.log('loanAmount', loanAmount);

    //d3e4354d-0703-4b88-a9ae-5b3956181a70

    if (!isFormValid) {
      showToast('warning', 'Required field cannot be empty.', 'bottom', 3000);
      return;
    }
    let payload = {loanAmount};
    this.props.addCustomerLoanAmountThunk(
      payload,
      selectedApplicationId,
      success => {
        navigate(ScreenNames.CheckCIBIL, {params});
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
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};

    return (
      <Loan_Amount_Component
        headerProp={{
          title: `${isEdit ? 'Edit ' : ''}Loan Amount`,
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
});

export default connect(mapStateToProps, mapActionCreators)(LoanAmountScreen);
