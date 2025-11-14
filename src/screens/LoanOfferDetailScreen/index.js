import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loan_Offer_Detail_Component from './Loan_Offer_Detail_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {formatVehicleNumber} from '../../utils/helper';
import {fetchEmiPlanThunk} from '../../redux/actions/emiPlanActions';
import {postCustomerLenderDetailsThunk} from '../../redux/actions';

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

  onProceedPress = async () => {
    let params = this.props.route?.params;
    await this.saveTenureAndInterest(params);
    navigate(ScreenNames.AddReference, {params});
  };

  onLoanOfferPress = () => {
    navigate(ScreenNames.CustomizeLoanOffer);
  };

  saveTenureAndInterest = async item => {
    const {selectedApplicationId, emiPlan, selectedLoanApplication} =
      this.props;

    let param = {
      // lenderName: item?.title,
      interesetRate: Number(selectedLoanApplication?.interesetRate),
      tenure: Number(emiPlan?.tenureMonths),
      emi: parseFloat(emiPlan?.schedule?.[0]?.emi),
      processingFee: parseFloat(selectedLoanApplication?.processingFee),
      principalAmount: parseFloat(emiPlan?.schedule?.[0]?.principal), //principal
    };

    await new Promise(resolve => {
      this.props.postCustomerLenderDetailsThunk(
        selectedApplicationId,
        param,
        success => {
          resolve();
        },
        error => {
          resolve();
        },
      );
    });
  };

  render() {
    const {loanDetail} = this.state;
    const {selectedLoanApplication, emiPlan, loading} = this.props;

    const _registerNumber =
      selectedLoanApplication?.usedVehicle?.registerNumber || '-';
    let loanAmount = selectedLoanApplication?.loanAmount || 100000;
    let tenure = emiPlan?.tenureMonths;
    let interesetRate = selectedLoanApplication?.interesetRate || 8;
    let processingFee = selectedLoanApplication?.processingFee || 1000;

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
        lenderLogo={loanDetail?.lenderLogo}
      />
    );
  }
}

const mapActionCreators = {fetchEmiPlanThunk, postCustomerLenderDetailsThunk};
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
