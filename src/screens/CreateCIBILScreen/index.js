import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import CreateCIBIL_Component from './CreateCIBIL_Component';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {
  fetchLoanApplicationFromIdThunk,
  sendOtpForCibilThunk,
  verifyOtpForCibilThunk,
  fetchCibilScoreThunk,
} from '../../redux/actions';
import strings from '../../locales/strings';

class CreateCIBILScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      panCardNumber: '',
      fullName: '',
      gender: '',
      errors: {
        mobileNumber: '',
        panCardNumber: '',
        fullName: '',
        gender: '',
      },
      otp: '',
      isFormValid: false,
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };

    this.onGenerateNowPress = this.onGenerateNowPress.bind(this);
  }

  componentDidMount() {
    const {selectedApplicationId} = this.props;
    this.props.fetchLoanApplicationFromIdThunk(
      selectedApplicationId,
      {},
      response => {
        this.setState({
          mobileNumber: response?.customer?.mobileNumber,
          panCardNumber: response?.customer?.customerDetails?.panCardNumber,
          fullName: response?.customer?.customerDetails?.applicantName,
          gender: response?.customer?.customerDetails?.gender,
        });
      },
    );
  }

  onGenerateNowPress = () => {
    const isFormValid = this.validateAllFields();

    const {mobileNumber, panCardNumber, fullName, gender} = this.state;
    let params = getScreenParam(this.props.route, 'params');

    if (!isFormValid) {
      showToast('warning', strings.errorMissingField, 'bottom', 3000);
      return;
    }

    let payload = {
      mobile: mobileNumber,
      pan: panCardNumber,
      name: fullName,
      gender: gender,
      consent: 'N',
      customerId: this.props.selectedCustomerId,
    };

    this.props.fetchCibilScoreThunk(
      payload,
      res => {
        if (res?.success && res?.data) {
          navigate(ScreenNames.CIBILReportScreen, {params});
        }
      },
      error => {},
    );

    // navigate(ScreenNames.CustomerEnvelope);
  };

  onChangeField = (key, value) => {
    handleFieldChange(this, key, value);
  };

  validateAllFields = _loanType => {
    const fieldsToValidate = [
      'mobileNumber',
      'panCardNumber',
      'fullName',
      'gender',
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

  onSelectedGender = value => {
    this.onChangeField('gender', value);
  };

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};
    const {errors, mobileNumber, isEdit, panCardNumber, fullName, gender} =
      this.state;

    return (
      <CreateCIBIL_Component
        headerProp={{
          title: 'Check CIBIL Score',
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
        onChangeMobileNumber={value =>
          this.onChangeField('mobileNumber', value)
        }
        onChangePanCardNumber={value =>
          this.onChangeField('panCardNumber', value)
        }
        onChangeFullName={value => this.onChangeField('fullName', value)}
        state={this.state}
        onGenerateNowPress={this.onGenerateNowPress}
        restInputProps={{
          mobileNumber: {
            isError: errors.mobileNumber,
            statusMsg: errors.mobileNumber,
            value: mobileNumber,
          },
          panCardNumber: {
            isError: errors.panCardNumber,
            statusMsg: errors.panCardNumber,
            value: panCardNumber,
            autoCapitalize: 'characters',
          },
          fullName: {
            isError: errors.fullName,
            statusMsg: errors.fullName,
            value: fullName,
            autoCapitalize: 'words',
          },
          gender: {
            isError: errors.gender,
            statusMsg: errors.gender,
          },
        }}
        loading={loading}
        onSelectedGender={this.onSelectedGender}
        selectedGender={gender}
      />
    );
  }
}

const mapActionCreators = {
  fetchLoanApplicationFromIdThunk,
  sendOtpForCibilThunk,
  verifyOtpForCibilThunk,
  fetchCibilScoreThunk,
};
const mapStateToProps = ({
  loanData,
  customerData,
  vehicleData,
  cibilReducer,
}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading || cibilReducer?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  selectedCustomer: customerData?.selectedCustomer,
});
export default connect(mapStateToProps, mapActionCreators)(CreateCIBILScreen);
