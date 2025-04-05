// colors.js

// Primary Theme Colors
export const PrimaryColors = {
  primary: '#1D95F0', // Navy Blue
  primaryLight: '#3DADFF', // Light Navy
  primaryDark: '#021F40', // Darker Navy
  primaryBlack: '#0E0F11',
};

// Accent Colors
export const SecondaryColors = {
  secondary: '#F4A900', // Yellow/Orange Accent
  secondaryLight: '#FFCF69', // Light Yellow
};

// Neutral Palette
export const NeutralColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F7FA',
  gray200: '#E1E5EA',
  gray300: '#C7CCD5',
  gray400: '#9FA6B2',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#222222',
};

// Status Colors
export const StatusColors = {
  success: '#28C76F',
  warning: '#FFA800',
  error: '#EA5455',
  info: '#00CFE8',
};

// Backgrounds & Surfaces
export const BackgroundColors = {
  background: '#F9FAFB',
  surface: '#FFFFFF',
};

// Text Colors
export const TextColors = {
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textInverse: '#FFFFFF',
  textLabel: '#828282',
};

// Combined Colors
const colors = {
  ...PrimaryColors,
  ...SecondaryColors,
  ...NeutralColors,
  ...StatusColors,
  ...BackgroundColors,
  ...TextColors,
};

export default colors;
