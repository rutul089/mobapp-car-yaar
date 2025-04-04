import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import typography from './src/theme/typography';
import OTPVerification from './src/components/OTPVerification';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <OTPVerification
            pinCount={4}
            onOtpComplete={e => alert(e)}
            containerStyle={{marginTop: 50}}
            inputStyle={{}}
            focusedInputStyle={{}}
          />
        </View>
      </SafeAreaView>
    );
  }
}
