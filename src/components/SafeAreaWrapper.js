// src/components/SafeAreaWrapper.js
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SafeAreaWrapper = ({
  children,
  statusBarColor = '#ffffff',
  backgroundColor = '#ffffff',
  barStyle = 'light-content',
  hideBottom = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      {/* StatusBar customization */}
      <StatusBar
        translucent
        backgroundColor={statusBarColor}
        barStyle={barStyle}
      />

      {/* Top Safe Area */}
      <View style={{height: insets.top, backgroundColor: statusBarColor}} />

      {/* Content */}
      <View style={styles.content}>{children}</View>
      {!hideBottom && <View style={{height: insets.bottom, backgroundColor}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
