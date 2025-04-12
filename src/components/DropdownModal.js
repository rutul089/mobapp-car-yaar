import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {Pressable, RadioButton, Spacing, Text} from '.';
import images from '../assets/images';
import theme from '../theme';

const screenHeight = Dimensions.get('window').height;

const DropdownModal = ({
  visible,
  data = [],
  selectedItem,
  onSelect,
  onClose,
  title = 'Select Option',
  showCloseIcon = true,
  customItemRenderer,
  showPrimaryButton = false,
  primaryButtonText = '',
  onPrimaryPress,
  showSecondaryButton = false,
  secondaryButtonText = '',
  onSecondaryPress,
  containerStyle,
  keyValue = 'label',
}: {
  visible: boolean,
  data: {label: string, [key: string]: any}[],
  selectedItem: string,
  onSelect: (item: any, index: number) => void,
  onClose: () => void,
  title?: string,
  showCloseIcon?: boolean,
  customItemRenderer?: (item: any, index: number) => React.ReactNode,
  showPrimaryButton?: boolean,
  primaryButtonText?: string,
  onPrimaryPress?: () => void,
  showSecondaryButton?: boolean,
  secondaryButtonText?: string,
  keyValue?: string,
  onSecondaryPress?: () => void,
  containerStyle?: ViewStyle,
}) => {
  const renderItem = ({item, index}) => {
    const label = item[keyValue];
    if (customItemRenderer) {
      return customItemRenderer(item, index);
    }

    return (
      <>
        <RadioButton
          label={label}
          selected={selectedItem === label}
          onPress={() => {
            onSelect(item, index);
            onClose();
          }}
          marginBottom={theme.sizes.spacing.md}
        />
      </>
    );
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}>
      <View style={[styles.container, containerStyle]}>
        {showCloseIcon && (
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Image
              source={images.closeRound}
              style={styles.closeImg}
              resizeMode="contain"
            />
          </Pressable>
        )}

        <Text hankenGroteskBold size="h3">
          {title}
        </Text>

        <Spacing size="md" />

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          style={styles.list}
        />

        {showPrimaryButton && (
          <>
            <Spacing size="md" />
            <Button label={primaryButtonText} onPress={onPrimaryPress} />
            <Spacing size="md" />
          </>
        )}

        {showSecondaryButton && (
          <>
            <Spacing size="md" />
            <Button
              label={secondaryButtonText}
              variant="link"
              onPress={onSecondaryPress}
            />
            <Spacing size="md" />
          </>
        )}
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
  closeImg: {
    height: 32,
    width: 32,
  },
  list: {
    maxHeight: screenHeight * 0.4,
  },
});
