/* eslint-disable react-native/no-inline-styles */
import {CommonModal, Text, theme} from '@caryaar/components';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const DeleteConfirmationContent = ({
  isVisible,
  onPressPrimaryButtonPress,
  onModalHide,
  primaryButtonLabel = 'Delete',
  title,
  message,
  isLoading = false,
}) => {
  return (
    <CommonModal
      isVisible={isVisible}
      onModalHide={onModalHide}
      primaryButtonLabel={primaryButtonLabel}
      isScrollableContent={true}
      isPrimaryButtonVisible={true}
      onPressPrimaryButton={onPressPrimaryButtonPress}
      title={title}
      tittleColor={theme.colors.error}
      restPrimaryButtonProp={{
        bgColor: theme.colors.error,
        themedColor: 'white',
        variant: 'ghost',
      }}>
      <View style={{paddingVertical: 5}}>
        {isLoading && (
          <ActivityIndicator
            size={'large'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}
        <Text textAlign="center" lineHeight={22}>
          {message}
        </Text>
      </View>
    </CommonModal>
  );
};

export default DeleteConfirmationContent;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.smd,
  },
  halfWidth: {
    width: '48%',
    marginBottom: theme.sizes.spacing.smd,
  },
});
