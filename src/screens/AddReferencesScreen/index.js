import React, {Component} from 'react';
import {connect} from 'react-redux';
import Add_References_Component from './Add_References_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class AddReferencesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onConfirmLoanPress = this.onConfirmLoanPress.bind(this);
  }

  componentDidMount() {}

  onConfirmLoanPress = () => {
    navigate(ScreenNames.ThankYouView);
  };

  render() {
    return (
      <>
        <Add_References_Component
          onConfirmLoanPress={this.onConfirmLoanPress}
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
export default connect(mapStateToProps, mapActionCreators)(AddReferencesScreen);
