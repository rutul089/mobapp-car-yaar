import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import images from '../assets/images';
import Button from './Button/Button';
import Pressable from './Pressable';
import RadioButton from './RadioButton';
import Spacing from './Spacing';
import Text from './Text';

const screenHeight = Dimensions.get('window').height;

const DropdownModal = ({
  visible,
  data = [],
  selectedItem,
  onSelect,
  onClose,
  title = 'Select Option',
  showCloseIcon = true,
  buttonPress,
  buttonLabel,
  showPrimaryButton,
  primaryButtonText,
  primaryButtonPress,
  customItem,
}) => {
  const renderItem = ({item, index}) =>
    customItem ? (
      customItem
    ) : (
      <>
        <RadioButton
          label={item.label}
          selected={selectedItem === item?.label}
          onPress={() => {
            onSelect(item, index);
            onClose();
          }}
        />
        <Spacing size="sm" />
      </>
    );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}>
      <View style={styles.container}>
        {showCloseIcon ? (
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Image
              source={images.closeRound}
              style={styles.closeImg}
              resizeMode="contain"
            />
          </Pressable>
        ) : null}

        <Text hankenGroteskBold={true} size={'h3'}>
          {title}
        </Text>
        <Spacing size="md" />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          //   contentContainerStyle={{paddingVertical: 200}}
          style={{maxHeight: screenHeight * 0.4}}
        />
        {showPrimaryButton ? (
          <>
            <Spacing size="md" />
            <Button label={primaryButtonText} onPress={primaryButtonPress} />
          </>
        ) : null}
      </View>
    </Modal>
  );
};

export default DropdownModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    padding: 24,
    // paddingTop: 20,
    // paddingBottom: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
  },

  closeBtn: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    padding: 6,
    zIndex: 1,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeImg: {height: 32, width: 32},
});
