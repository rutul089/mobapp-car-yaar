import React, {Component} from 'react';
import {connect} from 'react-redux';
import ScreenNames from '../../constants/ScreenNames';
import {
  getLabelFromEnum,
  loanType,
  loanTypeLabelMap,
} from '../../constants/enums';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import Customer_Envelop_Component from './Customer_Envelop_Component';
import {
  formatIndianCurrency,
  formatVehicleDetails,
  formatVehicleNumber,
  safeGet,
} from '../../utils/helper';
import {
  fetchLoanApplicationFromIdThunk,
  fetchPartnerEmployeeByIdThunk,
} from '../../redux/actions';

class CustomerEnvelopeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };
    this.onViewLenderPress = this.onViewLenderPress.bind(this);
  }

  async componentDidMount() {
    const {selectedApplicationId, partnerId} = this.props;
    await this.props.fetchPartnerEmployeeByIdThunk(partnerId);
    this.props.fetchLoanApplicationFromIdThunk(selectedApplicationId);
  }

  onViewLenderPress = () => {
    let params = getScreenParam(this.props.route, 'params');
    const {selectedLoanType} = this.props;
    if (selectedLoanType === loanType.internalBT) {
      return navigate(ScreenNames.LenderDetails);
    } else {
      return navigate(ScreenNames.LenderSelection, {params});
    }
  };

  render() {
    const {selectedLoanApplication, loading} = this.props;
    let {
      loanAmount,
      loanApplicationId,
      usedVehicle = {},
      vehicle = {},
      customer = {},
    } = selectedLoanApplication || {};
    const _registerNumber = safeGet(loading, usedVehicle, 'registerNumber');

    return (
      <Customer_Envelop_Component
        loanApplicationId={loanApplicationId}
        vehicleDetails={[
          {
            label: 'Registrar Number',
            value: formatVehicleNumber(_registerNumber),
          },
          {label: 'Make', value: safeGet(loading, vehicle, 'make')},
          {label: 'Model', value: formatVehicleDetails(vehicle)},
          {
            label: 'Year',
            value: safeGet(loading, usedVehicle, 'manufactureYear'),
          },
        ]}
        loanDetails={[
          {
            label: 'Applicant Name',
            value: safeGet(loading, customer, 'customerDetails.applicantName'),
          },
          {
            label: 'Mobile Number',
            value: safeGet(loading, customer, 'customerDetails.mobileNumber'),
          },
          {label: 'Vehicle Type', value: 'Used Car'},
          {
            label: 'Loan Type',
            value:
              getLabelFromEnum(
                loanTypeLabelMap,
                selectedLoanApplication?.loanType,
              ) || '-',
          },
          {
            label: 'Desired Loan Amount',
            value: formatIndianCurrency(loanAmount),
          },
        ]}
        onViewLenderPress={this.onViewLenderPress}
      />
    );
  }
}

const mapActionCreators = {
  fetchLoanApplicationFromIdThunk,
  fetchPartnerEmployeeByIdThunk,
};
const mapStateToProps = ({loanData, user}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
    partnerId: user?.userProfile?.partnerUser?.partnerId,
    userProfile: user?.userProfile,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(CustomerEnvelopeScreen);
