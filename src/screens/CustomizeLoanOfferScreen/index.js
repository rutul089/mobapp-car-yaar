import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customize_LoanOffer_Component from './Customize_LoanOffer_Component';
import {handleFieldChange, validateField} from '../../utils/inputHelper';
import {showToast} from '../../utils/helper';
import strings from '../../locales/strings';
import {fetchEmiPlanThunk} from '../../redux/actions/emiPlanActions';
import {goBack} from '../../navigation/NavigationUtils';

class CustomizeLoanOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestRate: '8',
      tenureMonths: 0,
      errors: {},
    };
    this.onSelectLoanType = this.onSelectLoanType.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
  }

  componentDidMount() {
    const {selectedLoanApplication} = this.props;
    let loanAmount = selectedLoanApplication?.loanAmount;
    let interestRate = selectedLoanApplication?.interesetRate;
    let tenureMonths = selectedLoanApplication?.tenure;

    this.setState({
      tenureMonths: String(tenureMonths),
    });
  }

  onSelectLoanType = value => {
    console.log({value});
  };

  onSubmitPress = () => {
    const {selectedLoanApplication} = this.props;
    const {interestRate, tenureMonths} = this.state;

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
    };
    this.props.fetchEmiPlanThunk(
      payload,
      success => {
        goBack();
      },
      error => {},
    );
  };

  onChangeField = (key, value, isOptional = false) => {
    handleFieldChange(this, key, value, isOptional);
  };

  validateAllFields = () => {
    const fieldsToValidate = ['interestRate', 'tenureMonths'];

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

  render() {
    const {interestRate, tenureMonths, errors} = this.state;
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
        }}
        loading={loading}
      />
    );
  }
}

const mapActionCreators = {fetchEmiPlanThunk};
const mapStateToProps = ({loanData, emiPlan}) => {
  return {
    selectedLoanApplication: loanData?.selectedLoanApplication, // Single view
    loading: emiPlan.loading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(CustomizeLoanOffer);
