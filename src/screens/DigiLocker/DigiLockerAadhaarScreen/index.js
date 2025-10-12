/* eslint-disable react-native/no-inline-styles */
import {SafeAreaWrapper, theme, Header} from '@caryaar/components';
import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {getScreenParam} from '../../../navigation/NavigationUtils';
import {fetchAadhaarFromDigilocker} from '../../../services';

class DigiLockerAadhaarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      loading: true,
      navData: null,
    };
    this.webViewRef = React.createRef();
    this._isNavigatingBack = false;
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    const params = getScreenParam(this.props.route, 'params');
    if (params) {
      this.setState({
        url: params?.url,
        loading: false,
        navData: params,
      });
    }
  }

  /**
   * Step 2: Handle navigation state change inside WebView
   */
  onNavigationStateChange = async navState => {
    console.log('navState', JSON.stringify(navState?.url));
    const {navData} = this.state;
    const {route, navigation} = this.props;
    const {onGoBack} = route.params || {};

    // Prevent multiple triggers
    if (this._isNavigatingBack) {
      return;
    }
    if (!navState?.url) {
      return;
    }
    let redirectUrl1 = 'https://caryaar-dev-api.pedalsupclients.xyz/';

    if (navState?.url.startsWith(redirectUrl1)) {
      this._isNavigatingBack = true; // ✅ mark as navigating back

      fetchAadhaarFromDigilocker(navData?.client_id)
        .then(data => {
          console.log('Aadhaar data:', data);
          onGoBack?.(data);
          navigation.pop(2);
          // navigate(ScreenNames.CustomerPersonalDetails);
          // goBack();
        })

        .catch(err => {
          console.log('error', JSON.stringify(err));
          // goBack();
          navigation.pop(2);
          // navigate(ScreenNames.CustomerPersonalDetails);
        })
        .finally(() => {});
    }
  };

  onBackPress = () => {
    this.props.navigation.pop(2);
  };

  render() {
    const {url, loading} = this.state;

    return (
      <SafeAreaWrapper
        statusBarColor={theme.colors.background}
        barStyle="dark-content"
        backgroundColor={theme.colors.background}>
        <Header
          backgroundColor={theme.colors.background}
          onBackPress={this.onBackPress}
        />
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.colors.background,
            }}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <WebView
            ref={this.webViewRef}
            source={{uri: url}}
            onNavigationStateChange={this.onNavigationStateChange}
            startInLoadingState
          />
        )}
      </SafeAreaWrapper>
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
