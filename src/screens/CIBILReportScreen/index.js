import React, {Component} from 'react';
import {connect} from 'react-redux';
import CIBILReport_Component from './CIBILReport_Component';
import {formatVehicleNumber} from '../../utils/helper';
import {
  getScreenParam,
  goBack,
  navigate,
} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import moment from 'moment';

class CIBILReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: this.props.route?.params?.isEdit || false,
      cibilScore: '',
    };
    this.onSavePress = this.onSavePress.bind(this);
  }

  componentDidMount() {
    const {params, cibil} = this.props.route.params;
    if (cibil) {
      this.setState({
        cibilScore: cibil?.score,
      });
    }
  }

  onSavePress = () => {
    navigate(ScreenNames.CustomerEnvelope);
  };

  render() {
    const {
      selectedVehicle,
      isCreatingLoanApplication,
      selectedLoanApplication,
      cibilReport,
      loading,
    } = this.props;

    const {cibilScore} = this.state;

    const {UsedVehicle = {}} = selectedVehicle || {};
    const {isEdit} = this.state;
    return (
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
        cibilScore={cibilReport?.score}
        onSavePress={this.onSavePress}
        lastUpdatedOn={moment().format('DD MMM YYYY')}
      />
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
  selectedApplicationId: loanData?.selectedApplicationId,
  loading: loanData?.loading || cibilReducer?.loading,
  selectedVehicle: vehicleData?.selectedVehicle,
  isCreatingLoanApplication: loanData?.isCreatingLoanApplication,
  selectedLoanApplication: loanData?.selectedLoanApplication,
  selectedCustomer: customerData?.selectedCustomer,
  cibilReport: cibilReducer?.score,
});
export default connect(mapStateToProps, mapActionCreators)(CIBILReportScreen);
