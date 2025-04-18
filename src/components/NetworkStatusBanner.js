import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Text, images} from '@caryaar/components';

const NetworkStatusBanner = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [visible, setVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setIsConnected(false);
        setVisible(true);
        fadeIn();
      } else if (!isConnected) {
        setIsConnected(true);
        fadeOut();
      }
    });

    return () => unsubscribe();
  }, [isConnected]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toastContainer, {opacity: fadeAnim}]}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Image
            source={images.noInternet}
            tintColor={'#666'}
            style={styles.iconStyle}
          />
        </View>
        <View style={styles.textContainer}>
          <Text hankenGroteskBold={true}>You're offline now</Text>
          <Text type={'helper-text'}>Oops! Internet is disconnected.</Text>
        </View>
        <TouchableOpacity onPress={fadeOut} style={styles.closeCircle}>
          <Image source={images.closeRound} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    // bottom: 40,
    top: 60,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    minWidth: '85%',
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  closeCircle: {
    width: 28,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  iconStyle: {
    height: 18,
    width: 18,
  },
});

export default NetworkStatusBanner;
