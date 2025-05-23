import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import CheckCIBIL_Component from './CheckCIBIL_Component';
import {formatVehicleNumber} from '../../utils/helper';

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
              ? formatVehicleNumber(UsedVehicle?.registerNumber)
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
