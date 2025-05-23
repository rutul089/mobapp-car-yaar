import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import CheckCIBIL_Component from './CheckCIBIL_Component';

class CheckCIBILScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isOTPSend: false,
    };
    this.handleMobileNumberInput = this.handleMobileNumberInput.bind(this);
    this.onSendOTP = this.onSendOTP.bind(this);
    this.onConfirmPress = this.onConfirmPress.bind(this);
  }

  componentDidMount() {}

  handleMobileNumberInput = value => {
    this.setState({mobileNumber: value});
  };

  onSendOTP = () => {
    this.setState({
      isOTPSend: true,
    });
  };

  onConfirmPress = () => {
    navigate(ScreenNames.CustomerEnvelope);
  };

  formatVehicleNumber = (vehicleNumber = '') => {
    const clean = vehicleNumber.toUpperCase().replace(/\s+/g, '');

    // Format for Bharat Series (e.g., KABH1234AA)
    const bhPattern = /^([A-Z]{2})(BH)(\d{4})([A-Z]{2})$/;
    const standardPattern = /^([A-Z]{2})(\d{2})([A-Z]{2})(\d{4})$/;

    if (bhPattern.test(clean)) {
      const [, state, bh, number, series] = clean.match(bhPattern);
      return `${state} ${bh} ${number} ${series}`;
    }

    // Format for standard numbers (e.g., GJ01RM5054)
    if (standardPattern.test(clean)) {
      const [, state, code, series, number] = clean.match(standardPattern);
      return `${state} ${code} ${series} ${number}`;
    }

    // Return original if it doesn't match known formats
    return vehicleNumber;
  };

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
      selectedCustomer,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};

    console.log(JSON.stringify(selectedCustomer));
    return (
      <>
        <CheckCIBIL_Component
          headerProp={{
            title: 'Check CIBIL Score',
            subtitle: isCreatingLoanApplication
              ? this.formatVehicleNumber(UsedVehicle?.registerNumber)
              : '',
            showRightContent: true,
            rightLabel: isCreatingLoanApplication
              ? selectedLoanApplication?.loanApplicationId || ''
              : '',
            rightLabelColor: '#F8A902',
            onBackPress: () => goBack(),
          }}
          handleMobileNumberInput={this.handleMobileNumberInput}
          state={this.state}
          onSendOTP={this.onSendOTP}
          isOtpSend={this.state.isOTPSend}
          onConfirmPress={this.onConfirmPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
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
export default connect(mapStateToProps, mapActionCreators)(CheckCIBILScreen);
