import React, {Component} from 'react';
import {connect} from 'react-redux';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';
import Finance_Documents_Component from '../FinanceDocumentsScreen/Finance_Documents_Component';

class TopUpFinanceDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNextStepPress = this.handleNextStepPress.bind(this);
    this.handleSaveDraftPress = this.handleSaveDraftPress.bind(this);
  }

  componentDidMount() {}

  handleNextStepPress = () => {
    navigate(ScreenNames.LoanAmount);
  };

  handleSaveDraftPress = () => {};

  render() {
    return (
      <>
        <Finance_Documents_Component
          imageSlots={[
            {
              key: 'soa',
              label: 'SOA',
              image: 'https://i.pravatar.cc/150?img=3',
            },
            {
              key: 'sanction_letter',
              label: 'Sanction Letter',
              image: null,
            },
            {
              key: 'noc',
              label: 'NOC',
              image: null,
            },
            {
              key: 'form_34',
              label: 'Form 34',
              image: null,
            },
            {
              key: 'other_documents',
              label: 'Other Documents',
              image: null,
            },
          ]}
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
export default connect(
  mapStateToProps,
  mapActionCreators,
)(TopUpFinanceDocuments);
