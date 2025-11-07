import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import theme from '../theme';

const FullLoader = ({visible = false}) => {
  if (!visible) {
    return null;
  }

  if (Platform.OS === 'android') {
    return (
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        statusBarTranslucent>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.iosLoader}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

export default FullLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosLoader: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
