import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';

const FullLoader = ({visible = false}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
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
});

// import React from 'react';
// import {View, ActivityIndicator, StyleSheet} from 'react-native';

// const FullLoader = ({visible = false}) => {
//   return (
//     <View style={styles.loaderStyle}>
//       <ActivityIndicator size={'large'} />
//     </View>
//   );
// };

// export default FullLoader;

// const styles = StyleSheet.create({
//   loaderStyle: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     width: '100%',
//     zIndex: 999,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
