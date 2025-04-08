import React from 'react';
import {Text as IText} from 'react-native';
import {theme} from '../theme';
import {
  computeFontFamily,
  computeFontLineHeight,
  computeFontSize,
  computeFontWeight,
} from './helper';
import {styles} from '../styles/Text.style';

const getTextComputedStyles = type => {
  if (type === 'helper-text') {
    return styles.helperText;
  } else if (type === 'body-text') {
    return styles.bodyText;
  } else if (type === 'large-header') {
    return styles.largeHeader;
  } else if (type === 'label') {
    return styles.label;
  } else if (type === 'input') {
    return styles.input;
  } else if (type === 'status') {
    return styles.status;
  } else if (type === 'caption') {
    return styles.captionText;
  } else {
    return styles.bodyText;
  }
};

const getAdditionalComputedStyles = (size, weight, color, fontFamily) => {
  let additionalStyles = {};
  if (size) {
    additionalStyles = {...additionalStyles, fontSize: size};
  }
  if (weight) {
    additionalStyles = {...additionalStyles, fontWeight: weight};
  }
  if (color) {
    additionalStyles = {...additionalStyles, color};
  }
  if (fontFamily) {
    additionalStyles = {...additionalStyles, fontFamily: fontFamily};
  }
  return additionalStyles;
};

const Text = ({
  color,
  size,
  weight,
  fontFamily,
  children,
  type,
  style,
  lineHeight,
  textAlign,
  margin,
  numberOfLines,
  hankenGroteskBlack,
  hankenGroteskBold,
  hankenGroteskExtraBold,
  hankenGroteskExtraLight,
  hankenGroteskLight,
  hankenGroteskMedium,
  hankenGroteskRegular,
  hankenGroteskSemiBold,
  hankenGroteskThin,
  ellipsizeMode,
  adjustsFontSizeToFit,
  poppinsLight,
  ...rest
}) => {
  const isValidJSX = React.isValidElement(children);
  const computedFontSize = computeFontSize(size);
  const computedFontFamily = computeFontFamily(fontFamily);
  const computedFontWeight = computeFontWeight(weight);
  const computeLineHeight = computeFontLineHeight(lineHeight);
  const computedStyles = getTextComputedStyles(type);

  const defaultTextStyle = {
    fontFamily:
      computedFontFamily ?? theme.typography.fonts.hankenGroteskRegular,
    fontSize: computedFontSize ?? theme.typography.fontSizes.body,
    color: color ?? theme.colors.textPrimary,
    fontWeight: computedFontWeight ?? undefined,
    lineHeight: computeLineHeight ?? undefined,
    textAlign: textAlign,
    margin: margin ?? 0,
  };

  const additionalComputedStyles = getAdditionalComputedStyles(
    computedFontSize,
    computedFontWeight,
    color,
    computedFontFamily,
  );

  return (
    <>
      {children && isValidJSX ? (
        children
      ) : children !== undefined &&
        children !== null &&
        (typeof children === 'string'
          ? children?.trim?.() !== ''
          : children !== '') ? (
        <IText
          {...rest}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          style={[
            defaultTextStyle,
            computedStyles,
            additionalComputedStyles,
            hankenGroteskBlack &&
              theme.typography.fontStyles.hankenGroteskBlack,
            hankenGroteskBold && theme.typography.fontStyles.hankenGroteskBold,
            hankenGroteskExtraBold &&
              theme.typography.fontStyles.hankenGroteskExtraBold,
            hankenGroteskExtraLight &&
              theme.typography.fontStyles.hankenGroteskExtraLight,
            hankenGroteskLight &&
              theme.typography.fontStyles.hankenGroteskLight,
            hankenGroteskMedium &&
              theme.typography.fontStyles.hankenGroteskMedium,
            hankenGroteskRegular &&
              theme.typography.fontStyles.hankenGroteskRegular,
            hankenGroteskSemiBold &&
              theme.typography.fontStyles.hankenGroteskSemiBold,
            hankenGroteskThin && theme.typography.fontStyles.hankenGroteskThin,
            style,
          ]}>
          {children}
        </IText>
      ) : null}
    </>
  );
};

export default Text;
//largeHeader:24
//bodyTitle:16
//bodyText(regular):16
//helperTextBold:14
//helperText(light):14
//helperMedium:14
//deviceHeader(medium):20
//tinyLabelBold:9
//tinyLabel(light):9
//button:14
