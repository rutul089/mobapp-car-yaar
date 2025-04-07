import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Text from './Text';

const CustomModalWrapper = ({visible, onClose, children}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.overlay} onPress={onClose} />

        <View style={styles.modalContainer}>
          {/* Cancel icon */}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text>X</Text>
            {/* <Ionicons name="close" size={24} color="#333" /> */}
          </TouchableOpacity>

          {/* Modal Content */}
          <View style={styles.contentWrapper}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModalWrapper;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },
  contentWrapper: {
    width: '100%',
  },
});
