import React, {Component} from 'react';
import {connect} from 'react-redux';
import Manage_Members_Component from './Manage_Members_Component';
import {Alert} from 'react-native';

class ManageMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: [
        {
          id: '1',
          name: 'Aarav Mehta',
          phone: '98765 43210',
          avatar: 'https://i.pravatar.cc/150?img=11',
        },
        {
          id: '2',
          name: 'Kavya Sharma',
          phone: '91234 56789',
          avatar: 'https://i.pravatar.cc/150?img=12',
        },
        {
          id: '3',
          name: 'Rohan Desai',
          phone: '99887 66554',
          avatar: 'https://i.pravatar.cc/150?img=13',
        },
        {
          id: '4',
          name: 'Ishita Verma',
          phone: '90123 45678',
          avatar: 'https://i.pravatar.cc/150?img=14',
        },
        {
          id: '5',
          name: 'Devansh Kapoor',
          phone: '98701 11223',
          avatar: 'https://i.pravatar.cc/150?img=15',
        },
      ],
      isVisible: false,
      fullName: '',
      mobileNumber: '',
    };
    this.handleDeleteMemberPress = this.handleDeleteMemberPress.bind(this);
    this.handleAddNewMemberPress = this.handleAddNewMemberPress.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.onPressPrimaryButton = this.onPressPrimaryButton.bind(this);
    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
  }

  componentDidMount() {}

  handleDeleteMemberPress = (item, index) => {
    Alert.alert(JSON.stringify(item));
  };

  handleAddNewMemberPress = () => {
    this.setState({
      isVisible: true,
    });
  };

  onModalHide = () => {
    this.setState({
      isVisible: false,
    });
  };

  onPressPrimaryButton = () => {
    const {mobileNumber, fullName} = this.state;

    Alert.alert(mobileNumber + ' ' + fullName);
    this.onModalHide();
  };

  onChangeFullName = value => {
    this.setState({
      fullName: value,
    });
  };

  onChangeMobileNumber = value => {
    this.setState({
      mobileNumber: value,
    });
  };

  render() {
    const {mobileNumber, fullName} = this.state;
    return (
      <>
        <Manage_Members_Component
          handleDeleteMemberPress={this.handleDeleteMemberPress}
          handleAddNewMemberPress={this.handleAddNewMemberPress}
          memberList={this.state.memberList}
          isVisible={this.state.isVisible}
          onModalHide={this.onModalHide}
          onPressPrimaryButton={this.onPressPrimaryButton}
          mobileNumber={mobileNumber}
          fullName={fullName}
          onChangeFullName={this.onChangeFullName}
          onChangeMobileNumber={this.onChangeMobileNumber}
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
export default connect(mapStateToProps, mapActionCreators)(ManageMemberScreen);
