import React, {Component} from 'react';
import {connect} from 'react-redux';
import Edit_Profile_Component from './Edit_Profile_Component';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSavePress = this.handleSavePress.bind(this);
  }

  componentDidMount() {}

  handleSavePress = () => {};

  render() {
    return (
      <>
        <Edit_Profile_Component handleSavePress={this.handleSavePress} />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(EditProfileScreen);
