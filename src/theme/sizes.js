export const spacing = {
  xs: 4, // extra small
  sm: 8, // small
  md: 16, // medium
  lg: 24, // large
  xl: 32, // extra large
  xxl: 40, // double extra large
  xxxl: 64, // triple extra large
};

export const icons = {
  xs: 12, // extra small
  sm: 16, // small
  md: 24, // medium (common default)
  lg: 32, // large
  xl: 40, // extra large
  xxl: 48, // double extra large
};

const sizes = {
  spacing,
  icons,
  ...{
    xs3: 50,
    xl4: 60,
    xs2: 120,
    xs: 160,
    sm: 162,
    md: 164,
    lg: 196,
    xl: 325,
    xl2: 335,
    xl3: 375,
  },
};

export default sizes;
