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
    };
    this.handleDeleteMemberPress = this.handleDeleteMemberPress.bind(this);
  }

  componentDidMount() {}

  handleDeleteMemberPress = (item, index) => {
    Alert.alert(JSON.stringify(item));
  };

  render() {
    return (
      <>
        <Manage_Members_Component
          handleDeleteMemberPress={this.handleDeleteMemberPress}
          memberList={this.state.memberList}
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
