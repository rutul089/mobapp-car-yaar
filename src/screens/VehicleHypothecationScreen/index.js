import React, {Component} from 'react';
import {connect} from 'react-redux';
import {currentLoanOptions} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import {submitVehicleThunk, updateVehicleByIdThunk} from '../../redux/actions';
import {formatVehicleNumber} from '../../utils/helper';
import Vehicle_Hypothecation_Component from './Vehicle_Hypothecation_Component';

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
  // hypothecationStatus
  componentDidMount() {
    const {selectedVehicle} = this.props;
    if (selectedVehicle) {
      this.setState({
        carHypoStatus: selectedVehicle?.UsedVehicle?.hypothecationStatus,
      });
    }
  }

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
  };

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      loading,
    } = this.props;
    const {UsedVehicle = {}} = selectedVehicle || {};

    return (
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
