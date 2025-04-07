import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import Loan_Documents_Component from './Loan_Documents_Component';

class LoanDocumentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontImg: 'https://i.pravatar.cc/150?img=3',
      rearImg: null,
      sideImg: 'https://i.pravatar.cc/150?img=2',
      interiorImg: 'https://i.pravatar.cc/150?img=1',
      damageImg: null,
      rcBookImg: null,
    };
  }

  render() {
    const {frontImg, rearImg, sideImg, interiorImg, damageImg, rcBookImg} =
      this.state;
    return (
      <>
        <Loan_Documents_Component
          imageSlots={[
            {
              key: 'front',
              label: 'ID Proof',
              image: null,
            },
            {
              key: 'rear',
              label: 'Address Proof',
              image: null,
            },
            {
              key: 'side',
              label: 'Permanent Address',
              image: null,
            },
            {
              key: 'interior',
              label: 'Income Proof',
              image: interiorImg,
            },
            {
              key: 'damage',
              label: 'Banking Proof',
              image: damageImg,
            },
            {key: 'Other Document', label: 'Other Document', image: rcBookImg},
            {key: 'Business Proof', label: 'Business Proof', image: rcBookImg},
            {key: 'Insurance', label: 'Insurance', image: rcBookImg},
          ]}
          // onImagePress={this.onImagePress}
          // onDeletePress={this.onDeletePress}
          // saveAsDraftPress={this.saveAsDraftPress}
          // onNextPress={this.onNextPress}
          // onBackPress={this.onBackPress}
        />
      </>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapActionCreators)(LoanDocumentsScreen);
