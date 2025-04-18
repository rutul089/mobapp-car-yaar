'use strict';

import React, {PureComponent} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  PanResponder,
  View,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rect.prototype.containsPoint = function (x, y) {
  return (
    x >= this.x &&
    y >= this.y &&
    x <= this.x + this.width &&
    y <= this.y + this.height
  );
};

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
  },
};

export default class Slider extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    disabled: PropTypes.bool,
    minimumValue: PropTypes.number,
    maximumValue: PropTypes.number,
    step: PropTypes.number,
    minimumTrackTintColor: PropTypes.string,
    maximumTrackTintColor: PropTypes.string,
    thumbTintColor: PropTypes.string,
    thumbTouchSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    onValueChange: PropTypes.func,
    onSlidingStart: PropTypes.func,
    onSlidingComplete: PropTypes.func,
    thumbImage: PropTypes.any,
    debugTouchArea: PropTypes.bool,
    animateTransitions: PropTypes.bool,
    animationType: PropTypes.oneOf(['spring', 'timing']),
    animationConfig: PropTypes.object,
  };

  static defaultProps = {
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    step: 0,
    minimumTrackTintColor: '#3f3f3f',
    maximumTrackTintColor: '#b3b3b3',
    thumbTintColor: '#343434',
    thumbTouchSize: {width: 40, height: 40},
    debugTouchArea: false,
    animationType: 'timing',
  };

  constructor(props) {
    super(props);

    this.state = {
      containerSize: {width: 0, height: 0},
      trackSize: {width: 0, height: 0},
      thumbSize: {width: 0, height: 0},
      allMeasured: false,
      value: new Animated.Value(this._clampValue(props.value)),
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  componentWillReceiveProps(nextProps) {
    const newValue = this._clampValue(nextProps.value);
    if (this.props.value !== newValue) {
      if (this.props.animateTransitions) {
        this._setCurrentValueAnimated(newValue);
      } else {
        this._setCurrentValue(newValue);
      }
    }
  }

  render() {
    const {
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      thumbImage,
      styles,
      style,
      trackStyle,
      thumbStyle,
      debugTouchArea,
      ...other
    } = this.props;

    const {value, containerSize, trackSize, thumbSize, allMeasured} =
      this.state;
    const mainStyles = styles || defaultStyles;

    let thumbLeft = new Animated.Value(0);
    let trackLength = 0;

    if (allMeasured) {
      trackLength = Math.max(containerSize.width - thumbSize.width, 1);
      thumbLeft = value.interpolate({
        inputRange: [minimumValue, maximumValue],
        outputRange: [0, trackLength],
        extrapolate: 'clamp',
      });
    }

    const valueVisibleStyle = allMeasured ? {} : {opacity: 0};

    const minimumTrackStyle = {
      position: 'absolute',
      width: allMeasured ? Animated.add(thumbLeft, thumbSize.width / 2) : 0,
      backgroundColor: minimumTrackTintColor,
      ...valueVisibleStyle,
    };

    const touchOverflowStyle = this._getTouchOverflowStyle();

    return (
      <View
        {...other}
        style={[mainStyles.container, style]}
        onLayout={this._measureContainer}>
        <View
          style={[
            {backgroundColor: maximumTrackTintColor},
            mainStyles.track,
            trackStyle,
          ]}
          renderToHardwareTextureAndroid
          onLayout={this._measureTrack}
        />
        <Animated.View
          renderToHardwareTextureAndroid
          style={[mainStyles.track, trackStyle, minimumTrackStyle]}
        />
        <Animated.View
          onLayout={this._measureThumb}
          renderToHardwareTextureAndroid
          style={[
            {backgroundColor: thumbTintColor},
            mainStyles.thumb,
            thumbStyle,
            {
              transform: [{translateX: thumbLeft}, {translateY: 0}],
              ...valueVisibleStyle,
            },
          ]}>
          {this._renderThumbImage()}
        </Animated.View>
        <View
          renderToHardwareTextureAndroid
          style={[defaultStyles.touchArea, touchOverflowStyle]}
          {...this._panResponder.panHandlers}>
          {debugTouchArea && this._renderDebugThumbTouchRect(thumbLeft)}
        </View>
      </View>
    );
  }

  _clampValue = value => {
    const {minimumValue, maximumValue} = this.props;
    return Math.min(Math.max(value, minimumValue), maximumValue);
  };

  _handleStartShouldSetPanResponder = e => this._thumbHitTest(e);
  _handleMoveShouldSetPanResponder = () => false;

  _handlePanResponderGrant = () => {
    this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    this._fireChangeEvent('onSlidingStart');
  };

  _handlePanResponderMove = (e, gestureState) => {
    if (this.props.disabled) {
      return;
    }
    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onValueChange');
  };

  _handlePanResponderRequestEnd = () => false;

  _handlePanResponderEnd = (e, gestureState) => {
    if (this.props.disabled) {
      return;
    }
    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onSlidingComplete');
  };

  _measureContainer = e => this._handleMeasure('containerSize', e);
  _measureTrack = e => this._handleMeasure('trackSize', e);
  _measureThumb = e => this._handleMeasure('thumbSize', e);

  _handleMeasure = (name, e) => {
    const {width, height} = e.nativeEvent.layout;
    this[`_${name}`] = {width, height};

    if (this._containerSize && this._trackSize && this._thumbSize) {
      const allMeasured =
        this._containerSize.width > 0 &&
        this._trackSize.width > 0 &&
        this._thumbSize.width > 0;

      this.setState({
        containerSize: this._containerSize,
        trackSize: this._trackSize,
        thumbSize: this._thumbSize,
        allMeasured,
      });
    }
  };

  _getRatio = value =>
    (value - this.props.minimumValue) /
    (this.props.maximumValue - this.props.minimumValue);

  _getThumbLeft = value =>
    this._getRatio(value) *
    (this.state.containerSize.width - this.state.thumbSize.width);

  _getValue = gestureState => {
    const length = this.state.containerSize.width - this.state.thumbSize.width;
    const thumbLeft = this._previousLeft + gestureState.dx;
    const ratio = thumbLeft / length;
    const {step, minimumValue, maximumValue} = this.props;

    let value = ratio * (maximumValue - minimumValue) + minimumValue;

    if (step) {
      value = Math.round((value - minimumValue) / step) * step + minimumValue;
    }

    return this._clampValue(value);
  };

  _getCurrentValue = () => this.state.value.__getValue();

  _setCurrentValue = value => this.state.value.setValue(value);

  _setCurrentValueAnimated = value => {
    const animationType = this.props.animationType;
    const animationConfig = {
      ...DEFAULT_ANIMATION_CONFIGS[animationType],
      ...this.props.animationConfig,
      toValue: value,
    };

    Animated[animationType](this.state.value, animationConfig).start();
  };

  _fireChangeEvent = event => {
    if (this.props[event]) {
      this.props[event](this._getCurrentValue());
    }
  };

  _getTouchOverflowSize = () => {
    const {thumbSize, containerSize} = this.state;
    const {thumbTouchSize} = this.props;

    return {
      width: Math.max(0, thumbTouchSize.width - thumbSize.width),
      height: Math.max(0, thumbTouchSize.height - containerSize.height),
    };
  };

  _getTouchOverflowStyle = () => {
    const {width, height} = this._getTouchOverflowSize();
    const style = {};

    if (width && height) {
      style.marginTop = style.marginBottom = -height / 2;
      style.marginLeft = style.marginRight = -width / 2;
    }

    if (this.props.debugTouchArea) {
      style.backgroundColor = 'orange';
      style.opacity = 0.5;
    }

    return style;
  };

  _thumbHitTest = e => {
    const {locationX, locationY} = e.nativeEvent;
    return this._getThumbTouchRect().containsPoint(locationX, locationY);
  };

  _getThumbTouchRect = () => {
    const {thumbTouchSize} = this.props;
    const {thumbSize, containerSize} = this.state;
    const overflowSize = this._getTouchOverflowSize();

    return new Rect(
      overflowSize.width / 2 +
        this._getThumbLeft(this._getCurrentValue()) +
        (thumbSize.width - thumbTouchSize.width) / 2,
      overflowSize.height / 2 +
        (containerSize.height - thumbTouchSize.height) / 2,
      thumbTouchSize.width,
      thumbTouchSize.height,
    );
  };

  _renderDebugThumbTouchRect = thumbLeft => {
    const rect = this._getThumbTouchRect();
    return (
      <Animated.View
        style={[
          defaultStyles.debugThumbTouchArea,
          {
            left: thumbLeft,
            top: rect.y,
            width: rect.width,
            height: rect.height,
          },
        ]}
        pointerEvents="none"
      />
    );
  };

  _renderThumbImage = () => {
    const {thumbImage} = this.props;
    return thumbImage ? <Image source={thumbImage} /> : null;
  };
}

const defaultStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
});
