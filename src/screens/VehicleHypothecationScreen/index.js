import React, {Component} from 'react';
import {connect} from 'react-redux';
import {currentLoanOptions} from '../../constants/enums';
import ScreenNames from '../../constants/ScreenNames';
import {goBack, navigate} from '../../navigation/NavigationUtils';
import Vehicle_Hypothecation_Component from './Vehicle_Hypothecation_Component';
import {formatVehicleNumber} from '../../utils/helper';

class VehicleHypothecationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carHypoStatus: currentLoanOptions.YES,
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
    navigate(ScreenNames.CustomerDetail);
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

export default connect(
  mapStateToProps,
  mapActionCreators,
)(VehicleHypothecationScreen);
