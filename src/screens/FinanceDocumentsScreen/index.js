import React, {Component} from 'react';
import {connect} from 'react-redux';
import Finance_Documents_Component from './Finance_Documents_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class FinanceDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {}

  onNextPress = () => {
    navigate(ScreenNames.LoanAmount);
  };

  render() {
    return (
      <>
        <Finance_Documents_Component
          imageSlots={[
            {
              key: 'noc',
              label: 'NOC',
              image: 'https://i.pravatar.cc/150?img=3',
            },
            {
              key: 'soa',
              label: 'Form 24 or SOA',
              image: null,
            },
            {
              key: 'document',
              label: 'Other Documents',
              image: null,
            },
          ]}
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
)(FinanceDocumentsScreen);
