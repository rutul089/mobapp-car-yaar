export const spacing = {
  xs: 4, // extra small
  sm: 8, // small
  smd: 12, // small-medium
  md: 16, // medium
  md_lg: 20,
  lg: 24, // large
  xl: 32, // extra large
  xxl: 40, // double extra large
  xxxl: 64, // triple extra large
};

export const icons = {
  xs: 12, // extra small
  sm: 16, // small
  smd: 20, // small-medium
  md: 24, // medium (common default)
  lg: 32, // large
  xl: 40, // extra large
  xxl: 48, // double extra large
  iconXLarge: 34,
  iconXXLarge: 36,
};

export const borderRadius = {
  xs: 2, // Extra subtle rounding
  sm: 6, // Small
  md: 8, // Medium (commonly used)
  lg: 10, // Large
  xl: 12, // Extra large
  xxl: 16, // Extra-extra large (rounded buttons, cards)
  xxxl: 18, // Very large or pill shape
  jumbo: 20, // For modals, cards, soft UI (NEW)
  card: 12,
};

const sizes = {
  spacing,
  icons,
  borderRadius,
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
    padding: 24,
  },
};

export default sizes;
