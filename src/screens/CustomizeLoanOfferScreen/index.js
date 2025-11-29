import React, {Component} from 'react';
import {connect} from 'react-redux';
import strings from '../../locales/strings';
import {getScreenParam, goBack} from '../../navigation/NavigationUtils';
import {postCustomerLenderDetailsThunk} from '../../redux/actions';
import {fetchEmiPlanThunk} from '../../redux/actions/emiPlanActions';
import {showToast} from '../../utils/helper';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import Customize_LoanOffer_Component from './Customize_LoanOffer_Component';

class CustomizeLoanOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestRate: '8',
      tenureMonths: 0,
      errors: {},
      processingFee: '',
      principalAmount: '',
    };
    this.onSelectLoanType = this.onSelectLoanType.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
  }

  componentDidMount() {
    let route = this.props.route;
    let loanDetail = route?.params;
    const {selectedLoanApplication} = this.props;

    let interestRate = selectedLoanApplication?.interesetRate;
    let tenureMonths = selectedLoanApplication?.tenure;
    let processingFee = selectedLoanApplication?.processingFee;
    let principalAmount = selectedLoanApplication?.principalAmount;

    console.log(
      'selectedLoanApplication',
      JSON.stringify(selectedLoanApplication),
    );

    this.setState({
      tenureMonths: String(tenureMonths),
      interestRate: String(interestRate),
      processingFee: String(processingFee),
      principalAmount: String(principalAmount),
    });
  }

  onSelectLoanType = value => {
    console.log({value});
  };

  onSubmitPress = () => {
    const {selectedLoanApplication} = this.props;
    const {interestRate, tenureMonths, processingFee} = this.state;

    const isFormValid = this.validateAllFields();

    if (!isFormValid) {
      showToast('warning', strings.errorMissingField, 'bottom', 3000);
      return;
    }

    let loanAmount = selectedLoanApplication?.loanAmount;

    let payload = {
      loanAmount,
      interestRate,
      tenureMonths,
      processingFee,
    };

    this.props.fetchEmiPlanThunk(
      payload,
      async success => {
        await this.saveTenureAndInterest(payload);
        goBack();
      },
      error => {},
    );
  };

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  validateAllFields = () => {
    const fieldsToValidate = ['interestRate', 'tenureMonths', 'processingFee'];

    const errors = {};
    let isFormValid = true;

    fieldsToValidate.forEach(key => {
      const value = this.state[key];

      const error = validateField(key, value);
      errors[key] = error;
      if (error !== '') {
        isFormValid = false;
      }
    });

    this.setState({errors, isFormValid});
    return isFormValid;
  };

  saveTenureAndInterest = async item => {
    const {selectedApplicationId} = this.props;

    let param = {
      // lenderName: item?.title,
      interesetRate: Number(item?.interestRate),
      tenure: Number(item?.tenureMonths),
      // emi: parseFloat(item?.emi.replace(/[,₹]/g, '')),
      processingFee: parseFloat(item?.processingFee.replace(/[,₹]/g, '')),
      // principalAmount: Number,
    };

    await new Promise(resolve => {
      this.props.postCustomerLenderDetailsThunk(
        selectedApplicationId,
        param,
        success => {
          resolve();
        },
        error => {
          showToast('error', 'Failed to save lender details');
          resolve();
        },
      );
    });
  };

  render() {
    const {interestRate, tenureMonths, errors, processingFee} = this.state;
    const {loading} = this.props;

    // tenureMonths interestRate

    return (
      <Customize_LoanOffer_Component
        loanTypes={[
          'Vanilla Loan',
          'Step Up',
          'Step Down',
          'Bullet Loan',
          'Interest Moratorium',
          'Balloon Loans',
        ]}
        onSelectLoanType={this.onSelectLoanType}
        onSubmitPress={this.onSubmitPress}
        interestRate={interestRate}
        tenureMonths={tenureMonths}
        onInterestRateChange={value =>
          this.onChangeField('interestRate', value)
        }
        onTenureMonthsChange={value =>
          this.onChangeField('tenureMonths', value)
        }
        onProcessingFeeChange={value =>
          this.onChangeField('processingFee', value)
        }
        processingFee={processingFee}
        restInputProps={{
          interestRate: {
            isError: errors?.interestRate,
            statusMsg: errors?.interestRate,
            value: interestRate,
          },
          tenureMonths: {
            isError: errors?.tenureMonths,
            statusMsg: errors?.tenureMonths,
            value: tenureMonths,
          },
          processingFee: {
            isError: errors?.processingFee,
            statusMsg: errors?.processingFee,
          },
        }}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {fetchEmiPlanThunk, postCustomerLenderDetailsThunk};
const mapStateToProps = ({loanData, emiPlan}) => {
  return {
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    loading: emiPlan.loading && !loanData?.loading,
    selectedApplicationId: loanData?.selectedApplicationId,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomizeLoanOffer);
