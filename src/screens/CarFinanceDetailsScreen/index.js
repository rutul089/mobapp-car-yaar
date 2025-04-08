import React, {Component} from 'react';
import {connect} from 'react-redux';
import CarFinance_Details_Component from './CarFinance_Details_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class CarFinanceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSaveDraftPress = this.handleSaveDraftPress.bind(this);
    this.handleNextStepPress = this.handleNextStepPress.bind(this);
  }

  componentDidMount() {}

  handleNextStepPress = () => {
    navigate(ScreenNames.TopUpFinanceDocuments);
  };

  handleSaveDraftPress = () => {};

  render() {
    return (
      <>
        <CarFinance_Details_Component
          handleNextStepPress={this.handleNextStepPress}
          handleSaveDraftPress={this.handleSaveDraftPress}
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
export default connect(mapStateToProps, mapActionCreators)(CarFinanceDetails);
