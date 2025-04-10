import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import Text from './Text';
import images from '../assets/images';
import Pressable from './Pressable';
import Button from './Button/Button';
import Spacing from './Spacing';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const screenHeight = Dimensions.get('window').height;

const CommonModal = ({
  isVisible,
  title = '',
  showCloseIcon = true,
  children,
  isPrimaryButtonVisible = false,
  primaryButtonLabel = 'Submit',
  onPressPrimaryButton,
  modalContentStyle,
  isScrollableContent,
  modalContainerStyle,
  onModalHide = () => {},
}) => {
  const [isModalVisible, setModalVisible] = React.useState(isVisible);

  React.useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const iModalContentStyle = StyleSheet.flatten([
    styles.modalContainer,
    modalContentStyle,
  ]);
  const iModalContainerStyle = StyleSheet.flatten([
    styles.container,
    modalContainerStyle,
  ]);

  const additionHeight =
    Platform.OS === 'ios' ? 0 : StatusBar.currentHeight ?? 0;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        setModalVisible(!isModalVisible);
        onModalHide(!isModalVisible);
      }}
      onBackButtonPress={() => {
        setModalVisible(!isModalVisible);
        onModalHide(!isModalVisible);
      }}
      style={styles.modal}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: -additionHeight,
        })}
        style={styles.KeyboardAvoidingViewStyle}>
        <View style={iModalContainerStyle}>
          {showCloseIcon && (
            <Pressable
              onPress={() => {
                setModalVisible(!isModalVisible);
                onModalHide(!isModalVisible);
              }}
              style={styles.closeBtn}>
              <Image
                source={images.closeRound}
                style={styles.closeImg}
                resizeMode="contain"
              />
            </Pressable>
          )}
          <View style={iModalContentStyle}>
            {title && (
              <>
                <Text
                  size={'h3'}
                  hankenGroteskExtraBold={true}
                  textAlign={'center'}>
                  {title}
                </Text>
                <Spacing size="sm" />
              </>
            )}
            {isScrollableContent ? (
              <ScrollView>{children}</ScrollView>
            ) : (
              children
            )}
            {isPrimaryButtonVisible && (
              <>
                <Spacing size="md_lg" />
                <Button
                  label={primaryButtonLabel}
                  onPress={onPressPrimaryButton}
                />
                <Spacing size="md" />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    flex: 1,
    maxHeight: screenHeight * 0.8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    // position: 'absolute',
    top: -10,
    alignSelf: 'center',
    padding: 6,
    zIndex: 1,
  },
  closeImg: {
    height: 32,
    width: 32,
  },
  title: {
    textAlign: 'center',
  },
  KeyboardAvoidingViewStyle: {flex: 1, maxHeight: screenHeight * 0.8},
  modalContainer: {
    padding: 24,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
});
