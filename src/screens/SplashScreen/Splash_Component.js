import {SafeAreaWrapper, Text, theme} from '@caryaar/components';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';

import {styles} from '../../styles/splash';

const Splash_Component = ({params, onPress}) => {
  return (
    <SafeAreaWrapper
      statusBarColor={theme.colors.primary}
      backgroundColor={theme.colors.primaryLight}
      barStyle="light-content">
      <LinearGradient
        style={styles.wrapper}
        colors={[theme.colors.primary, theme.colors.primaryLight]}>
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
