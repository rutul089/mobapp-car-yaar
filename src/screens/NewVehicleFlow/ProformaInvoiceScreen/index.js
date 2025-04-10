import React, {Component} from 'react';
import {connect} from 'react-redux';
import Proforma_Invoice_Component from './Proforma_Invoice_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

class ProformaInvoiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exShowroomPrice: '',
      tcs: '',
      roadTax: '',
      registrationCharges: '',
      fastag: '',
      roadSafetyCes: '',
      insurance: '',
      discount: '',
      onRoadPrice: '',
      invoiceErrors: {},
    };
    this.handleOnProceed = this.handleOnProceed.bind(this);
  }

  componentDidMount() {}

  handleInvoiceDetailChange = updatedValues => {
    this.setState({invoiceValues: updatedValues});
  };

  handleOnProceed = () => {
    navigate(ScreenNames.CustomerDetail);
  };

  render() {
    return (
      <>
        <Proforma_Invoice_Component
          onChange={this.handleInvoiceDetailChange}
          handleProceedChange={this.handleProceedChange}
          errors={this.state.invoiceErrors}
          handleFieldBlur={this.handleFieldBlur}
          handleOnProceed={this.handleOnProceed}
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
)(ProformaInvoiceScreen);
