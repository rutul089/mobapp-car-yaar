import React, {Component} from 'react';
import {connect} from 'react-redux';
import Vehicle_Hypothecation_Component from './Vehicle_Hypothecation_Component';
import {currentLoanOptions} from '../../constants/enums';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class VehicleHypothecationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carHypoStatus: '',
    };
    this.onSelectedAnswer = this.onSelectedAnswer.bind(this);
    this.saveAsDraftPress = this.saveAsDraftPress.bind(this);
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {}

  onSelectedAnswer = value => {
    this.setState({
      carHypoStatus: value,
    });
  };

  saveAsDraftPress = () => {};

  onNextPress = () => {
    navigate(ScreenNames.CustomerDetail);
  };

  render() {
    return (
      <>
        <Vehicle_Hypothecation_Component
          state={this.state}
          answerList={[
            {label: 'Yes', value: currentLoanOptions.yes},
            {label: 'No', value: currentLoanOptions.no},
          ]}
          onSelectedAnswer={this.onSelectedAnswer}
          onNextPress={this.onNextPress}
          saveAsDraftPress={this.saveAsDraftPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(VehicleHypothecationScreen);
