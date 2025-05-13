import React from 'react';
import {View, StyleSheet} from 'react-native';
import Slider from '../components/Slider';
import Text from './Text';
import {formatIndianCurrency} from '../utils/helper';

const CurrencySlider = ({
  value,
  onValueChange,
  min = 0,
  max = 7290000,
  step = 1000,
  minLabel = formatIndianCurrency(0),
  maxLabel = formatIndianCurrency(7290000),
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text type={'label'}>{label}</Text>
      <Slider
        value={Number(value)}
        onValueChange={onValueChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor="#1D95F0"
        maximumTrackTintColor="#3DADFF80"
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
      <View style={styles.labels}>
        <Text type={'label'} hankenGroteskMedium={true}>
          {minLabel}
        </Text>
        <Text type={'label'} hankenGroteskMedium={true}>
          {maxLabel}
        </Text>
      </View>
    </View>
  );
};

export default CurrencySlider;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 16,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3DADFF80',
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    borderColor: '#1E90FF',
    borderWidth: 4,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 4,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 4,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});
