const fontWeights = {
  normal: '400',
  semibold: '600',
  medium: '500',
  bold: '700',
  light: '300',
  thin: '100',
  black: '900',
  extraLight: '200',
  extraBold: '800',
  regular: '400',
};

const fonts = {
  hankenGroteskBlack: 'HankenGrotesk-Black',
  hankenGroteskBold: 'HankenGrotesk-Bold',
  hankenGroteskExtraBold: 'HankenGrotesk-ExtraBold',
  hankenGroteskExtraLight: 'HankenGrotesk-ExtraLight',
  hankenGroteskLight: 'HankenGrotesk-Light',
  hankenGroteskMedium: 'HankenGrotesk-Medium',
  hankenGroteskRegular: 'HankenGrotesk-Regular',
  hankenGroteskSemiBold: 'HankenGrotesk-SemiBold',
  hankenGroteskThin: 'HankenGrotesk-Thin',
};

const lineHeights = {
  h1: 40,
  h2: 32,
  h3: 28,
  body: 24,
  small: 20,
  caption: 16,
  button: 20,
};

const fontSizes = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  small: 14,
  caption: 12,
  button: 16,
};

const fontStyles = {
  hankenGroteskBlack: {
    fontFamily: fonts.hankenGroteskBlack,
    fontWeight: fontWeights.black,
  },
  hankenGroteskBold: {
    fontFamily: fonts.hankenGroteskBold,
    fontWeight: fontWeights.bold,
  },
  hankenGroteskExtraBold: {
    fontFamily: fonts.hankenGroteskExtraBold,
    fontWeight: fontWeights.extraBold,
  },
  hankenGroteskExtraLight: {
    fontFamily: fonts.hankenGroteskExtraLight,
    fontWeight: fontWeights.extraLight,
  },
  hankenGroteskLight: {
    fontFamily: fonts.hankenGroteskLight,
    fontWeight: fontWeights.light,
  },
  hankenGroteskMedium: {
    fontFamily: fonts.hankenGroteskMedium,
    fontWeight: fontWeights.medium,
  },
  hankenGroteskRegular: {
    fontFamily: fonts.hankenGroteskRegular,
    fontWeight: fontWeights.regular,
  },
  hankenGroteskSemiBold: {
    fontFamily: fonts.hankenGroteskSemiBold,
    fontWeight: fontWeights.bold,
  },
  hankenGroteskThin: {
    fontFamily: fonts.hankenGroteskThin,
    fontWeight: fontWeights.thin,
  },
};

const typography = {
  fontWeights,
  fonts,
  lineHeights,
  fontSizes,
  fontStyles,
};

export default typography;
