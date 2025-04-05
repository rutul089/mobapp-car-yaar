import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaWrapper, Text, Spacing, Pressable} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../styles/Login.style';
import theme from '../../theme';
import typography from '../../theme/typography';
import images from '../../assets/images';

const LoginScreen = ({params, mobileNumber, setMobileNumber, generateOTP}) => {
  return (
    <SafeAreaWrapper
      barStyle="dark-content"
      statusBarColor="rgba(29, 149, 240, 0)"
      backgroundColor={'rgba(61, 173, 255, 0.48)'}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LinearGradient
          style={styles.wrapper}
          useAngle
          angle={360}
          colors={['rgba(61, 173, 255, 0.48)', 'rgba(29, 149, 240, 0)']}>
          <View style={styles.container}>
            <Text
              hankenGroteskExtraBold={true}
              size={28}
              color={theme.colors.primary}>
              CarYaar
            </Text>
            <Spacing size="md" />
            <Text
              hankenGroteskBold={true}
              size={typography.fontSizes.h1}
              color={theme.colors.black}>
              Welcome Back!
            </Text>
            <Spacing />
            <Text type={'helper-text'}>
              Get Instant Approval on your Auto Loan
            </Text>
            <Spacing size="xl" />
            <View style={styles.card}>
              <View style={styles.label}>
                <Image
                  source={images.callOutline}
                  style={styles.labelIcon}
                  resizeMode="contain"
                />
                <Text
                  type={'helper-text'}
                  color={theme.colors.primary}
                  lineHeight={typography.lineHeights.small}>
                  Enter your Mobile Number
                </Text>
              </View>
              <TextInput
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="98744 32092"
                keyboardType="number-pad"
                maxLength={10}
                textAlign="center"
                style={styles.input}
              />
              <Pressable style={styles.button} onPress={generateOTP}>
                <LinearGradient
                  useAngle
                  colors={['#1D95F0', '#3DADFF']}
                  locations={[0, 1]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  angle={109}
                  style={styles.gradient}>
                  <Text
                    hankenGroteskExtraBold={true}
                    color={'white'}
                    lineHeight={theme.typography.lineHeights.button}
                    size={theme.typography.fontSizes.button}>
                    Generate OTP
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
