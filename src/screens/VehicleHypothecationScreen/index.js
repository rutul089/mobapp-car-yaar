import React, {Component} from 'react';
import {connect} from 'react-redux';
import {currentLoanOptions, loanType} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import Vehicle_Hypothecation_Component from './Vehicle_Hypothecation_Component';
import {formatVehicleNumber, showToast} from '../../utils/helper';
import {updateVehicleByIdThunk, submitVehicleThunk} from '../../redux/actions';

class VehicleHypothecationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carHypoStatus: currentLoanOptions.NO,
    };
    this.onSelectedAnswer = this.onSelectedAnswer.bind(this);
    this.saveAsDraftPress = this.saveAsDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {}

  onSelectedAnswer = value => {
    this.setState({
      carHypoStatus: value,
    });
  };

  saveAsDraftPress = () => {};

  onNextPress = () => {
    const {selectedVehicle, isCreatingLoanApplication} = this.props;
    const {carHypoStatus} = this.state;

    let vehicleId = selectedVehicle?.UsedVehicle?.id;

    let payload = {
      hypothecationStatus: carHypoStatus,
    };

    this.props.updateVehicleByIdThunk(vehicleId, payload, () => {
      this.props.submitVehicleThunk(
        vehicleId,
        () => {
          if (isCreatingLoanApplication) {
            navigate(ScreenNames.CustomerFullScreen);
          } else {
            navigate(ScreenNames.SuccessScreen);
          }
        },
        error => {},
      );
    });

    // switch (selectedLoanType) {
    //   case loanType.refinance:
    //     return navigate(ScreenNames.FinanceDetails);

    //   case loanType.topUp:
    //   case loanType.internalBT:
    //   case loanType.externalBT:
    //     return navigate(ScreenNames.CarFinanceDetails);

    //   case loanType.loan:
    //     return navigate(ScreenNames.CheckCIBIL);

    //   default:
    //     return navigate(ScreenNames.LoanAmount);
    // }
    // navigate(ScreenNames.CustomerDetail);
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
    return (
      <>
        <Vehicle_Hypothecation_Component
          headerProp={{
            title: 'Vehicle Details',
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
          state={this.state}
          onSelectedAnswer={this.onSelectedAnswer}
          onNextPress={this.onNextPress}
          saveAsDraftPress={this.saveAsDraftPress}
          isCreatingLoanApplication={isCreatingLoanApplication}
          loading={loading}
        />
      </>
    );
  }
}

const mapActionCreators = {updateVehicleByIdThunk, submitVehicleThunk};

const mapStateToProps = ({loanData, customerData, vehicleData}) => ({
  selectedLoanType: loanData.selectedLoanType,
  selectedCustomerId: customerData?.selectedCustomerId,
  documentDetail: customerData?.documentDetail,
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading || vehicleData?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  selectedCustomer: loanData?.selectedCustomer,
});

export default connect(
  mapStateToProps,
  mapActionCreators,
)(VehicleHypothecationScreen);
