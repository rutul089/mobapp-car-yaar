/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';

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
  // 1. Call backend to start journey and get redirectUrl
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
      this.setState({loading: false, url: 'https://www.google.com/'});
    }
  };

  /**
   * Step 2: Handle navigation state change inside WebView
   */
  onNavigationStateChange = async navState => {
    const {url: navUrl} = navState;
    if (!navUrl) {
      return;
    }

    if (navUrl.startsWith('https://your.backend/redirect-callback')) {
      const code =
        this.extractParam(navUrl, 'code') ||
        this.extractParam(navUrl, 'journeyId');

      try {
        const resp = await axios.post(
          'https://your.backend/api/digilocker/exchange',
          {code},
        );

        const {navigation} = this.props;
        navigation.replace('CibilScreen', {aadhaar: resp.data.aadhaar});
      } catch (error) {
        console.error('Error exchanging DigiLocker code:', error);
      }
    }
  };

  /**
   * Utility to extract query parameters from URL
   */
  extractParam = (url, name) => {
    const match = url.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return match ? decodeURIComponent(match[1]) : null;
  };

  render() {
    const {url, loading} = this.state;

    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }
    return (
      <WebView
        ref={this.webViewRef}
        source={{uri: url}}
        onNavigationStateChange={this.onNavigationStateChange}
        startInLoadingState
      />
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
