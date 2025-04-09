import React, {Component} from 'react';
import {connect} from 'react-redux';
import Customer_Documents_Component from './Customer_Documents_Component';
import {navigate} from '../../navigation/NavigationUtils';
import ScreenNames from '../../constants/ScreenNames';

class CustomerDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNextPress = this.onNextPress.bind(this);
  }

  componentDidMount() {}

  handleCreateNewWallet = () => {};

  handleImportWallet = () => {};

  onNextPress = () => {
    navigate(ScreenNames.CustomerFinancialDocs);
  };

  render() {
    return (
      <>
        <Customer_Documents_Component
          customerList={[
            {
              label: 'ID Proof',
              image: 'https://i.pravatar.cc/150?img=3',
            },
            {
              label: 'Address Proof',
              image: 'https://i.pravatar.cc/150',
            },
            {
              label: 'Permanent Address',
              image: 'https://i.pravatar.cc/150',
            },
            {
              label: 'Income Proof',
              image: 'https://i.pravatar.cc/150',
            },
            {
              label: 'Banking Proof',
              image: 'https://i.pravatar.cc/150',
            },
            {
              label: 'Other Documents',
              image: 'https://i.pravatar.cc/150',
            },
            {
              label: 'Business Proof',
              image: 'https://i.pravatar.cc/150',
            },
            {
              label: 'Insurance',
              image: 'https://i.pravatar.cc/150',
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
)(CustomerDocumentsScreen);
