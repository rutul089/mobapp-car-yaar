import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import RadioBlock from './RadioBlock';

const RadioGroupRow = ({
  label,
  options = [],
  selectedValue,
  onChange,
  renderItem,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      {label && <Text type="label">{label}</Text>}
      <View style={styles.row}>
        {options.map(item => {
          const isSelected = selectedValue === item.value;
          const onPress = () => onChange(item.value);

          if (renderItem) {
            return renderItem({item, isSelected, onPress});
          }

          return (
            <RadioBlock
              key={item.value}
              label={item.label}
              isSelected={isSelected}
              wrapperStyle={styles.flex}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
  },
  flex: {
    flex: 1,
  },
});

export default RadioGroupRow;

{
  /* <RadioGroupRow
  label="Select answer"
  options={answerOption}
  selectedValue={state.selectedAnswer}
  onChange={onSelectAnswer}
  renderItem={({item, isSelected, onPress}) => (
    <CustomRadioCard
      title={item.label}
      selected={isSelected}
      onPress={onPress}
    />
  )}
/> */
}
