import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loan_Offer_Detail_Component from './Loan_Offer_Detail_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {formatVehicleNumber} from '../../utils/helper';
import {fetchEmiPlanThunk} from '../../redux/actions/emiPlanActions';

class LoanOfferDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanDetail: {},
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };
    this.onProceedPress = this.onProceedPress.bind(this);
    this.onLoanOfferPress = this.onLoanOfferPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let loanDetail =
      getScreenParam(route, 'params') || route?.params?.loanDetail;

    this.setState(
      {
        loanDetail,
      },
      () => {
        this.callFetchEmiPlanThunk();
      },
    );
  }

  callFetchEmiPlanThunk = () => {
    const {selectedLoanApplication} = this.props;

    let loanAmount = selectedLoanApplication?.loanAmount;
    let interestRate = selectedLoanApplication?.interesetRate || 8;
    let tenureMonths = selectedLoanApplication?.tenure;

    let payload = {
      loanAmount,
      interestRate,
      tenureMonths,
    };

    this.props.fetchEmiPlanThunk(
      payload,
      success => {},
      error => {},
    );
  };

  onProceedPress = () => {
    let params = this.props.route?.params;

    navigate(ScreenNames.AddReference, {params});
  };

  onLoanOfferPress = () => {
    navigate(ScreenNames.CustomizeLoanOffer);
  };

  render() {
    const {loanDetail} = this.state;
    const {selectedLoanApplication, emiPlan, loading} = this.props;
    const _registerNumber =
      selectedLoanApplication?.usedVehicle?.registerNumber || '-';
    let loanAmount = selectedLoanApplication?.loanAmount || 100000;
    let tenure = emiPlan?.tenureMonths;
    let interesetRate = selectedLoanApplication?.interesetRate || 8;
    let processingFee = loanDetail?.processingFee || 1000;

    return (
      <Loan_Offer_Detail_Component
        onProceedPress={this.onProceedPress}
        onLoanOfferPress={this.onLoanOfferPress}
        loanDetail={this.state.loanDetail}
        emiData={emiPlan?.schedule}
        registerNumber={formatVehicleNumber(_registerNumber)}
        loanAmount={loanAmount}
        tenure={tenure}
        loading={loading}
        loanApplicationId={selectedLoanApplication?.loanApplicationId}
        emi={emiPlan?.schedule?.[0]?.emi}
        interesetRate={interesetRate}
        processingFee={processingFee}
      />
    );
  }
}

const mapActionCreators = {fetchEmiPlanThunk};
const mapStateToProps = ({loanData, emiPlan}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading && !emiPlan.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
    emiPlan: emiPlan.emiPlanData,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(LoanOfferDetailScreen);
