import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select_Vehicle_Component from './Select_Vehicle_Component';
import {navigate} from '../../../navigation/NavigationUtils';
import ScreenNames from '../../../constants/ScreenNames';

class SelectVehicleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleProceedPress = this.handleProceedPress.bind(this);
  }

  componentDidMount() {}

  handleProceedPress = () => {
    navigate(ScreenNames.ProformaInvoice);
  };

  render() {
    return (
      <>
        <Select_Vehicle_Component
          handleProceedPress={this.handleProceedPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(SelectVehicleScreen);
