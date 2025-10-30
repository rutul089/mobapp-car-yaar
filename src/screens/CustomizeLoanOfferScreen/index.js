import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customize_LoanOffer_Component from './Customize_LoanOffer_Component';
import {Alert} from 'react-native';

class CustomizeLoanOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSelectLoanType = this.onSelectLoanType.bind(this);
    this.onSubmitPress = this.onSubmitPress.bind(this);
  }

  componentDidMount() {}

  onSelectLoanType = value => {
    // Alert.alert(value);
  };

  onSubmitPress = () => {};

  render() {
    return (
      <>
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
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(CustomizeLoanOffer);
