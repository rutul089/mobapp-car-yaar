import React, {Component} from 'react';
import {connect} from 'react-redux';
import Lender_Selection_Component from './Lender_Selection_Component';
import {getScreenParam, navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import {postCustomerLenderDetailsThunk} from '../../redux/actions';
import {formatVehicleNumber} from '../../utils/helper';

class LenderSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: getScreenParam(props.route, 'params')?.isEdit || false,
    };
    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress = item => {
    const {selectedApplicationId} = this.props;
    let param = {
      lenderName: item?.title,
      interesetRate: Number(item?.interestRate),
      tenure: Number(item?.tenure),
      emi: parseFloat(item?.emi.replace(/[,₹]/g, '')),
      processingFee: parseFloat(item?.processingFee.replace(/[,₹]/g, '')),
      principalAmount: 1000,
    };
    this.props.postCustomerLenderDetailsThunk(
      selectedApplicationId,
      param,
      success => {
        let rawParams = getScreenParam(this.props.route, 'params');
        navigate(ScreenNames.LoanOfferDetail, {
          ...rawParams,
          loanDetail: {title: item?.title, interestRate: item?.interestRate},
        });
      },
    );
  };

  render() {
    const {selectedLoanApplication, loading} = this.props;
    const _registerNumber =
      selectedLoanApplication?.usedVehicle?.registerNumber || '-';

    return (
      <>
        <Lender_Selection_Component
          registerNumber={formatVehicleNumber(_registerNumber)}
          loanApplicationId={selectedLoanApplication?.loanApplicationId}
          onItemPress={this.onItemPress}
          loading={loading}
        />
      </>
    );
  }
}

const mapActionCreators = {postCustomerLenderDetailsThunk};
const mapStateToProps = ({loanData}) => {
  return {
    selectedLoanType: loanData.selectedLoanType,
    loading: loanData.loading,
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    selectedApplicationId: loanData?.selectedApplicationId,
  };
};
export default connect(mapStateToProps, mapActionCreators)(LenderSelection);
