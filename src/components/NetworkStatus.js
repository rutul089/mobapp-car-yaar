import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {useInternetStatus} from '../NoInternetProvider';

const NoInternetModal = () => {
  const isConnected = useInternetStatus();

  return (
    <Modal visible={!isConnected} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>No Internet</Text>
          <Text style={styles.subtitle}>Please check your connection.</Text>
        </View>
      </View>
    </Modal>
  );
};

export default NoInternetModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e53935',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#444',
  },
});
