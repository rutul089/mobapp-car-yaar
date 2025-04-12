import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Text from './Text';
import RadioBlock from './RadioBlock';

export type RadioOption = {
  label: string,
  value: string | number,
};

type RenderItemProps = {
  item: RadioOption,
  isSelected: boolean,
  onPress: () => void,
};

type RadioGroupRowProps = {
  label?: string,
  options: RadioOption[],
  selectedValue: string | number,
  onChange: (value: string | number) => void,
  renderItem?: (props: RenderItemProps) => React.ReactNode,
  containerStyle?: ViewStyle,
};

const RadioGroupRow = ({
  label,
  options,
  selectedValue,
  onChange,
  renderItem,
  containerStyle,
}: RadioGroupRowProps) => {
  return (
    <View style={containerStyle}>
      {label ? <Text type="label">{label}</Text> : null}
      <View style={styles.row}>
        {options.map(option => {
          const isSelected = selectedValue === option.value;
          const handlePress = () => onChange(option.value);

          return renderItem ? (
            <React.Fragment key={option.value.toString()}>
              {renderItem({
                item: option,
                isSelected,
                onPress: handlePress,
              })}
            </React.Fragment>
          ) : (
            <RadioBlock
              key={option.value.toString()}
              label={option.label}
              isSelected={isSelected}
              onPress={handlePress}
              wrapperStyle={styles.flex}
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

export default React.memo(RadioGroupRow);
