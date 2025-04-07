import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button/Button';
import theme from '../theme';

const FormFooterButtons = ({
  primaryButtonLabel,
  onPressPrimaryButton,
  primaryButtonStyle,
  secondaryButtonLabel,
  onPressSecondaryButton,
  secondaryButtonStyle,
  extraPropPrimaryButton,
  extraPropSecondaryButton,
}) => {
  return (
    <View style={styles.buttonRow}>
      <Button
        label={primaryButtonLabel}
        variant="link"
        buttonWrapper={[styles.button, primaryButtonStyle]}
        onPress={onPressPrimaryButton}
        {...extraPropPrimaryButton}
      />
      <Button
        label={secondaryButtonLabel}
        style={[styles.button, secondaryButtonStyle]}
        buttonWrapper={styles.button}
        onPress={onPressSecondaryButton}
        {...extraPropSecondaryButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    marginTop: theme.sizes.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4, // Small spacing between buttons
  },
});

export default FormFooterButtons;
