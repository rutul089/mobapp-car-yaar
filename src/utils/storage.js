import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  IS_LOGGED_IN: 'IS_LOGGED_IN',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
};

// Internal token cache
let cachedToken = null;

/**
 * Retrieves the access token, using cached value if available.
 * @returns {Promise<string|null>}
 */
export const getCachedToken = async () => {
  if (!cachedToken) {
    cachedToken = await getAccessToken();
  }
  return cachedToken;
};

/**
 * Clears the cached token in memory.
 */
export const clearCachedToken = () => {
  cachedToken = null;
};

// Access Token Methods
export const setAccessToken = async token => {
  if (token) {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    cachedToken = token; // Update cache when setting token
  }
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const clearAccessToken = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  clearCachedToken(); // Clear cache when removing token
};

// Login Status Methods
export const setLoginStatus = async value => {
  await AsyncStorage.setItem(
    STORAGE_KEYS.IS_LOGGED_IN,
    value ? 'true' : 'false',
  );
};

export const getLoginStatus = async () => {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
  return value === 'true';
};

export const clearLoginStatus = async () => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.IS_LOGGED_IN,
    STORAGE_KEYS.ACCESS_TOKEN,
  ]);
  clearCachedToken(); // Also clear cached token
};
