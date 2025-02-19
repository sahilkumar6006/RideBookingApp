import AsyncStorage from '@react-native-async-storage/async-storage';

interface Tokens {
  jwt?: string | null;
  refreshToken?: string | null;
}

// Keys for AsyncStorage
const JWT_KEY = '@auth_jwt';
const REFRESH_TOKEN_KEY = '@auth_refresh_token';

// Store tokens
export const storeTokens = async (tokens: Tokens): Promise<void> => {
  try {
    if (tokens.jwt) {
      await AsyncStorage.setItem(JWT_KEY, tokens.jwt);
    }
    if (tokens.refreshToken) {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    }
  } catch (error) {
    console.error('Error storing tokens:', error);
    throw error;
  }
};

// Get stored tokens
export const getStoredTokens = async (): Promise<Tokens> => {
  try {
    const [jwt, refreshToken] = await Promise.all([
      AsyncStorage.getItem(JWT_KEY),
      AsyncStorage.getItem(REFRESH_TOKEN_KEY),
    ]);

    return {
      jwt,
      refreshToken,
    };
  } catch (error) {
    console.error('Error getting stored tokens:', error);
    return {};
  }
};

// Remove tokens (for logout)
export const removeTokens = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(JWT_KEY),
      AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
    ]);
  } catch (error) {
    console.error('Error removing tokens:', error);
    throw error;
  }
};

// Update specific token
export const updateToken = async (
  tokenType: 'jwt' | 'refreshToken',
  token: string
): Promise<void> => {
  try {
    const key = tokenType === 'jwt' ? JWT_KEY : REFRESH_TOKEN_KEY;
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    console.error('Error updating token:', error);
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const jwt = await AsyncStorage.getItem(JWT_KEY);
    return !!jwt;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Create an auth header
export const getAuthHeader = async (): Promise<{ Authorization?: string }> => {
  try {
    const jwt = await AsyncStorage.getItem(JWT_KEY);
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  } catch (error) {
    console.error('Error getting auth header:', error);
    return {};
  }
}; 