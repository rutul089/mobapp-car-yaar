import React, {Component} from 'react';
import {connect} from 'react-redux';
import Finance_Details_Component from './Finance_Details_Component';
import {currentLoanOptions} from '../../constants/enums';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class FinanceDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: '',
    };
    this.onSelectAnswer = this.onSelectAnswer.bind(this);
    this.saveAsDraftPress = this.saveAsDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {}

  onFormChange = (key, value, callback) => {
    this.setState(
      {
        [key]: value,
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
    );
  };

  onSelectAnswer = value => {
    this.onFormChange('selectedAnswer', value);
  };

  saveAsDraftPress = () => {};

  onNextPress = () => {
    navigate(ScreenNames.FinanceDocuments);
  };

  render() {
    return (
      <>
        <Finance_Details_Component
          state={this.state}
          answerOption={[
            {label: 'Yes', value: currentLoanOptions.yes},
            {label: 'No', value: currentLoanOptions.no},
          ]}
          onSelectAnswer={this.onSelectAnswer}
          saveAsDraftPress={this.saveAsDraftPress}
          onNextPress={this.onNextPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(FinanceDetailsScreen);
