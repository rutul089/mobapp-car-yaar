import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import typography from '../theme/typography';

const OTPVerification = ({
  pinCount = 4,
  onOtpComplete,
  containerStyle,
  inputStyle,
  focusedInputStyle,
}) => {
  const [otp, setOtp] = useState(new Array(pinCount).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    let newOtp = [...otp];

    // Allow only one character input
    newOtp[index] = text ? text[text.length - 1] : '';
    setOtp(newOtp);

    // Move focus to the next input box
    if (text && index < pinCount - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If all digits are filled, trigger OTP complete callback
    if (newOtp.join('').length === pinCount) {
      onOtpComplete && onOtpComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      let newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);

      // Move focus back to the previous input box
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref)}
          style={[
            styles.otpInput,
            inputStyle,
            typography.fontStyles.hankenGroteskBold,
            focusedIndex === index
              ? [styles.otpFocused, focusedInputStyle]
              : {},
          ]}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    textAlign: 'center',
    fontSize: typography.fontSizes.h2,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  otpFocused: {
    // borderColor: 'black',
  },
});

export default OTPVerification;

/*

// This is code for auto read OTP
// npm install react-native-sms-retriever @react-native-community/clipboard
// <uses-permission android:name="android.permission.RECEIVE_SMS"/>
// <uses-permission android:name="android.permission.READ_SMS"/>
// <uses-permission android:name="android.permission.SEND_SMS"/>

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import Clipboard from "@react-native-community/clipboard";

const OTPVerification = ({
  pinCount = 4,
  onOtpComplete,
  containerStyle,
  inputStyle,
  focusedInputStyle,
}) => {
  const [otp, setOtp] = useState(new Array(pinCount).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  useEffect(() => {
    startSmsListener();
    checkClipboardForOtp();
  }, []);

  // 🔥 Auto Read OTP on Android
  const startSmsListener = async () => {
    try {
      await SmsRetriever.startSmsRetriever();
      const message = await SmsRetriever.requestOneTimeConsent();
      const extractedOtp = extractOtpFromMessage(message);
      if (extractedOtp) fillOtpFields(extractedOtp);
    } catch (error) {
      console.log("SMS Retriever error:", error);
    }
  };

  // 📌 Check Clipboard for OTP (iOS Fallback)
  const checkClipboardForOtp = async () => {
    if (Platform.OS === "ios") {
      const clipboardContent = await Clipboard.getString();
      const extractedOtp = extractOtpFromMessage(clipboardContent);
      if (extractedOtp) fillOtpFields(extractedOtp);
    }
  };

  // 📌 Extract OTP from Message
  const extractOtpFromMessage = (message) => {
    const otpRegex = /\b\d{4,6}\b/; // Matches 4-6 digit OTP
    const match = message.match(otpRegex);
    return match ? match[0] : null;
  };

  // 🎯 Fill OTP Inputs Automatically
  const fillOtpFields = (otpString) => {
    if (otpString.length >= pinCount) {
      const otpArray = otpString.split("").slice(0, pinCount);
      setOtp(otpArray);
      onOtpComplete && onOtpComplete(otpArray.join(""));
    }
  };

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text ? text[text.length - 1] : "";
    setOtp(newOtp);

    // Move to next input
    if (text && index < pinCount - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete
    if (newOtp.join("").length === pinCount) {
      onOtpComplete && onOtpComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      let newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.otpInput,
            inputStyle,
            focusedIndex === index ? [styles.otpFocused, focusedInputStyle] : {},
          ]}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  otpFocused: {
    borderColor: "black",
  },
});

export default OTPVerification;
*/
