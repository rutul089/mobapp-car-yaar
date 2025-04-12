import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Text from './Text';
import theme from '../theme';

const TextAreaInput = ({
  value,
  onChangeText,
  placeholder = 'Type here...',
  label = 'label',
  optionalText = 'optional',
  numberOfLines = 4,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      {!!label && (
        <Text type="label">
          {label}{' '}
          {!!optionalText && (
            <Text size="caption" color="#82828299">
              {optionalText}
            </Text>
          )}
        </Text>
      )}
      <TextInput
        style={styles.textArea}
        placeholder={placeholder}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textArea: {
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.sizes.borderRadius.md,
    padding: 12,
    backgroundColor: theme.colors.background,
    fontSize: theme.typography.fontSizes.small,
    lineHeight: theme.typography.lineHeights.small,
    maxHeight: 95,
    minHeight: 95,
    marginTop: 8,
    color: 'black',
    fontFamily: theme.typography.fonts.hankenGroteskMedium,
    fontWeight: theme.typography.fontWeights.medium,
  },
});

export default TextAreaInput;
