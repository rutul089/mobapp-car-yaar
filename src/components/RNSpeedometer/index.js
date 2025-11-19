/* eslint-disable react-native/no-inline-styles */
/* eslint import/no-unresolved: [2, { ignore: ['react-native', 'react'] }] */
/* eslint radix: ["error", "as-needed"] */
import {Text, theme} from '@caryaar/components';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Animated, Easing, Image, View} from 'react-native';

// Utils
import calculateDegreeFromLabels from './utils/calculate-degree-from-labels';
import calculateLabelFromValue from './utils/calculate-label-from-value';
import limitValue from './utils/limit-value';
import validateSize from './utils/validate-size';

// Style
import images from '../../assets/images';
import style, {width as deviceWidth} from './style';

class Speedometer extends Component {
  constructor(props) {
    super(props);
    this.speedometerValue = new Animated.Value(props.defaultValue);
  }

  render() {
    const {
      value,
      size,
      minValue,
      maxValue,
      easeDuration,
      allowedDecimals,
      labels,
      needleImage,
      wrapperStyle,
      outerCircleStyle,
      halfCircleStyle,
      imageWrapperStyle,
      imageStyle,
      innerCircleStyle,
      labelWrapperStyle,
      labelStyle,
      labelNoteStyle,
      useNativeDriver,
    } = this.props;
    const degree = 180;
    const perLevelDegree = calculateDegreeFromLabels(degree, labels);

    const label = calculateLabelFromValue(
      limitValue(value, minValue, maxValue, allowedDecimals),
      labels,
      minValue,
      maxValue,
    );
    Animated.timing(this.speedometerValue, {
      toValue: limitValue(value, minValue, maxValue, allowedDecimals),
      duration: easeDuration,
      easing: Easing.linear,
      useNativeDriver,
    }).start();

    const rotate = this.speedometerValue.interpolate({
      inputRange: [minValue, maxValue],
      outputRange: ['-90deg', '90deg'],
    });

    const currentSize = validateSize(size, deviceWidth - 20);
    return (
      <View
        style={[
          style.wrapper,
          {
            width: currentSize,
            height: currentSize / 2,
          },
          wrapperStyle,
        ]}>
        <View
          style={[
            style.outerCircle,
            {
              width: currentSize,
              height: currentSize / 2,
              borderTopLeftRadius: currentSize / 2,
              borderTopRightRadius: currentSize / 2,
            },
            outerCircleStyle,
          ]}>
          {labels.map((level, index) => {
            const circleDegree = 90 + index * perLevelDegree;
            return (
              <View
                key={level.name}
                style={[
                  style.halfCircle,
                  {
                    backgroundColor: level.activeBarColor,
                    width: currentSize / 2,
                    height: currentSize,
                    borderRadius: currentSize / 2,
                    transform: [
                      {translateX: currentSize / 4},
                      {rotate: `${circleDegree}deg`},
                      {translateX: (currentSize / 4) * -1},
                    ],
                  },
                  halfCircleStyle,
                ]}
              />
            );
          })}
          <Animated.View
            style={[
              style.imageWrapper,
              {
                top: -(currentSize / 15),
                transform: [{rotate}],
              },
              imageWrapperStyle,
            ]}>
            <Image
              style={[
                style.image,
                {
                  width: currentSize,
                  height: currentSize,
                },
                imageStyle,
              ]}
              source={needleImage}
            />
          </Animated.View>
          <View
            style={[
              style.innerCircle,
              {
                width: currentSize * 0.6,
                height: (currentSize / 2) * 0.6,
                borderTopLeftRadius: currentSize / 2,
                borderTopRightRadius: currentSize / 2,
              },
              innerCircleStyle,
            ]}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 4,
          }}>
          <Text
            style={{left: 15}}
            color={theme.colors.textSecondary}
            hankenGroteskMedium
            size={theme.typography.fontSizes.caption}>
            {minValue}
          </Text>
          <Text
            style={{right: 15}}
            color={theme.colors.textSecondary}
            hankenGroteskMedium
            size={theme.typography.fontSizes.caption}>
            {maxValue}
          </Text>
        </View>
        <View style={[style.labelWrapper, labelWrapperStyle]}>
          <Text
            hankenGroteskBold
            size={theme.typography.fontSizes.h1}
            style={[style.label, labelStyle]}>
            {limitValue(value, minValue, maxValue, allowedDecimals)}
          </Text>
          <Text
            hankenGroteskBold
            style={[{color: label.labelColor}, labelNoteStyle]}>
            {label.name}
          </Text>
        </View>
      </View>
    );
  }
}

Speedometer.defaultProps = {
  defaultValue: 50,
  minValue: 300,
  maxValue: 900,
  easeDuration: 10,
  allowedDecimals: 0,
  labels: [
    {
      name: 'Poor',
      labelColor: '#1D3B63',
      activeBarColor: '#FF0508',
    },
    {
      name: 'Fair',
      labelColor: '#1D3B63',
      activeBarColor: '#FF9D2D',
    },
    {
      name: 'Good',
      labelColor: '#1D3B63',
      activeBarColor: '#FFED2D',
    },
    {
      name: 'Excellent',
      labelColor: '#1D3B63',
      activeBarColor: '#16D154',
    },
  ],
  needleImage: images.speedometer_needle,
  wrapperStyle: {},
  outerCircleStyle: {},
  halfCircleStyle: {},
  imageWrapperStyle: {},
  imageStyle: {},
  innerCircleStyle: {},
  labelWrapperStyle: {},
  labelStyle: {},
  labelNoteStyle: {},
  useNativeDriver: true,
};

Speedometer.propTypes = {
  value: PropTypes.number.isRequired,
  defaultValue: PropTypes.number,
  size: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  easeDuration: PropTypes.number,
  allowedDecimals: PropTypes.number,
  labels: PropTypes.array,
  needleImage: PropTypes.any,
  wrapperStyle: PropTypes.object,
  outerCircleStyle: PropTypes.object,
  halfCircleStyle: PropTypes.object,
  imageWrapperStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  innerCircleStyle: PropTypes.object,
  labelWrapperStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  labelNoteStyle: PropTypes.object,
  useNativeDriver: PropTypes.bool,
};

export default Speedometer;
