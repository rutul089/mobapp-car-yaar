import React, {Component} from 'react';
import {connect} from 'react-redux';
import CIBILReport_Component from './CIBILReport_Component';
import {formatVehicleNumber} from '../../utils/helper';
import {goBack} from '../../navigation/NavigationUtils';

class CIBILReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      <>
        <CIBILReport_Component
          headerProp={{
            title: 'CIBIL Score',
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
        />
      </>
    );
  }
}

const mapActionCreators = {};
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
export default connect(mapStateToProps, mapActionCreators)(CIBILReportScreen);
