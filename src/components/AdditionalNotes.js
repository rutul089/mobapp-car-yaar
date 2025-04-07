import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Text from './Text';
import theme from '../theme';

const AdditionalNotes = ({value, onChangeText, placeholder}) => {
  return (
    <View style={styles.container}>
      <Text type={'label'}>
        Additional Notes{' '}
        <Text size={'caption'} color={'#82828299'}>
          (Optional)
        </Text>
      </Text>
      <TextInput
        style={styles.textArea}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  optional: {
    fontWeight: '400',
    color: '#888',
  },
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

export default AdditionalNotes;
