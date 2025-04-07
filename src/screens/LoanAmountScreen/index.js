import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loan_Amount_Component from './Loan_Amount_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class LoanAmountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNextButtonPress = this.onNextButtonPress.bind(this);
  }

  onNextButtonPress = () => {
    navigate(ScreenNames.CheckCIBIL);
  };

  render() {
    return (
      <>
        <Loan_Amount_Component onNextButtonPress={this.onNextButtonPress} />
      </>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapActionCreators)(LoanAmountScreen);
