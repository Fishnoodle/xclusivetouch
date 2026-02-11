// API Configuration 
// Automatically uses localhost:8001 in development, staging or production URL based on environment
export const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8001'
  : process.env.NEXT_PUBLIC_ENV === 'staging'
    ? 'https://staging-api.xclusivetouch.ca'
    : 'https://api.xclusivetouch.ca';

export const API_ENDPOINTS = {
  register: `${API_URL}/api/register`,
  login: `${API_URL}/api/login`,
  confirm: `${API_URL}/api/confirm`,
  resendConfirmation: `${API_URL}/api/resend-confirmation`,
  verifyToken: `${API_URL}/api/verify-token`,
  forgotPassword: `${API_URL}/api/forgotpassword`,
  confirmReset: `${API_URL}/api/confirmreset`,
  profile: (userId) => `${API_URL}/api/profile/${userId}`,
  createProfile: `${API_URL}/api/profile`,
  updateProfile: (userId) => `${API_URL}/api/profile/${userId}`,
  publicProfile: (username) => `${API_URL}/api/publicProfile/${username}`,
  user: (userId) => `${API_URL}/api/user/${userId}`,
  exchangeContact: (userId) => `${API_URL}/api/exchangeContact/${userId}`,
};
