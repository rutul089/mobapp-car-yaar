import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loan_Offer_Detail_Component from './Loan_Offer_Detail_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {formatVehicleNumber} from '../../utils/helper';
const emiData = [
  {
    sno: 1,
    opening: 42537500,
    emi: 9843,
    principal: 4969,
    interest: 4874,
    os: 420406,
  },
  {
    sno: 2,
    opening: 425375,
    emi: 9843,
    principal: 4969,
    interest: 4874,
    os: 420406,
  },
  {
    sno: 3,
    opening: 425375,
    emi: 9843,
    principal: 4969,
    interest: 4874,
    os: 420406,
  },
  {
    sno: 4,
    opening: 425375,
    emi: 9843,
    principal: 4969,
    interest: 423874,
    os: 4204026,
  },
  {
    sno: 5,
    opening: 425375,
    emi: 9843,
    principal: 496129,
    interest: 4874,
    os: 420406,
  },
  {
    sno: 6,
    opening: 425375,
    emi: 984003,
    principal: 4969,
    interest: 4874,
    os: 42012406,
  },
  {
    sno: 7,
    opening: 425375,
    emi: 9843,
    principal: 496129,
    interest: 4874,
    os: 420406,
  },
  {
    sno: 8,
    opening: 425375,
    emi: 984003,
    principal: 4969,
    interest: 4874,
    os: 42012406,
  },
  {
    sno: 9,
    opening: 425375,
    emi: 9843,
    principal: 496129,
    interest: 4874,
    os: 420406,
  },
  {
    sno: 10,
    opening: 425375,
    emi: 984003,
    principal: 4969,
    interest: 4874,
    os: 42012406,
  },
];

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
    this.setState({
      loanDetail,
    });
  }
  onProceedPress = () => {
    let params = this.props.route?.params;

    navigate(ScreenNames.AddReference, {params});
  };

  onLoanOfferPress = () => {
    navigate(ScreenNames.CustomizeLoanOffer);
  };

  render() {
    const {selectedLoanApplication} = this.props;
    const _registerNumber =
      selectedLoanApplication?.usedVehicle?.registerNumber || '-';
    return (
      <Loan_Offer_Detail_Component
        onProceedPress={this.onProceedPress}
        onLoanOfferPress={this.onLoanOfferPress}
        loanDetail={this.state.loanDetail}
        emiData={emiData}
        registerNumber={formatVehicleNumber(_registerNumber)}
      />
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = ({loanData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(LoanOfferDetailScreen);
