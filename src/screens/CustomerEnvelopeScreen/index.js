import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customer_Envelop_Component from './Customer_Envelop_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class CustomerEnvelopeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onViewLenderPress = this.onViewLenderPress.bind(this);
  }

  componentDidMount() {}

  onViewLenderPress = () => {
    navigate(ScreenNames.LenderSelection);
  };

  render() {
    return (
      <>
        <Customer_Envelop_Component
          vehicleDetails={[
            {label: 'Registrar Number', value: 'GJ 01 JR 0945'},
            {label: 'Make', value: 'Maruti Suzuki'},
            {label: 'Model', value: 'Vitara Brezza | ZDI'},
            {label: 'Year', value: '2019'},
          ]}
          loanDetails={[
            {label: 'Applicant Name', value: 'Vijay Dugar'},
            {label: 'Mobile Number', value: '99421 39740'},
            {label: 'Vehicle Type', value: 'Used Car'},
            {label: 'Loan Type', value: 'Purchase'},
            {label: 'Desired Loan Amount', value: '₹9,00,000'},
          ]}
          onViewLenderPress={this.onViewLenderPress}
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
)(CustomerEnvelopeScreen);
