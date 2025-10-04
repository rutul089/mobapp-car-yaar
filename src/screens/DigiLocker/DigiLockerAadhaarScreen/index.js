import axios from 'axios';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';


class DigiLockerAadhaarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      loading: true,
    };
    this.webViewRef = React.createRef();
  }

  componentDidMount() {
    this.startDigilockerJourney();
  }

  startDigilockerJourney = async () => {
    try {
      const response = await axios.post(
        'https://your.backend/api/start-digilocker-journey',
        {
          // any payload your backend expects
        },
      );
      this.setState({
        url: response.data.redirectUrl,
        loading: false,
      });
    } catch (error) {
      console.error('Error starting DigiLocker journey:', error);
      this.setState({loading: false});
    }
  };

  render() {
    return (
      <View>
        <Text> index </Text>
      </View>
    );
  }
}

const mapDispatchToProps = {};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.appState.isInternetConnected,
    isLoading: state.appState.loading,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DigiLockerAadhaarScreen);
