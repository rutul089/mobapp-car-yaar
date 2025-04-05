import React from 'react';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import {Text} from '../../components';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import {styles} from '../../styles/splash';
import colors from '../../theme/colors';

const Splash_Component = ({params, onPress}) => {
  return (
    <SafeAreaWrapper
      statusBarColor={colors.primary}
      backgroundColor={colors.primaryLight}
      barStyle="light-content">
      <LinearGradient
        style={styles.wrapper}
        colors={[colors.primary, colors.primaryLight]}>
        <View style={styles.innerWrapper}>
          <View style={styles.textWrapper}>
            <Text hankenGroteskExtraBold={true} size={48} color={'white'}>
              CarYaar
            </Text>
            <Text type={'helper-text'} color={'rgba(255, 255, 255, 0.6)'}>
              Get Instant Approval on your Auto Loan
            </Text>
          </View>
          <Image
            resizeMode="contain"
            source={images.onboarding1}
            style={styles.image}
          />
        </View>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default Splash_Component;
