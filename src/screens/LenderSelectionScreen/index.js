import React, {Component} from 'react';
import {connect} from 'react-redux';
import Lender_Selection_Component from './Lender_Selection_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class LenderSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onItemPress = this.onItemPress.bind(this);
  }

  componentDidMount() {}

  onItemPress = item => {
    navigate(ScreenNames.LoanOfferDetail, {params: item});
  };

  render() {
    return (
      <>
        <Lender_Selection_Component onItemPress={this.onItemPress} />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(LenderSelection);
