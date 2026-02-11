// Protected API Request Helper

/**
 * Make a protected API request with authentication token
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise} - The API response
 */
export async function protectedFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // No token found, redirect to login
    window.location.href = '/login';
    throw new Error('No authentication token found');
  }
  
  // Add Authorization header
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Check if token is expired (401 Unauthorized)
    if (response.status === 401) {
      // Clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('xclusiveToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }
    
    return response;
  } catch (error) {
    console.error('Protected API request failed:', error);
    throw error;
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  return !!(token && userId);
}

/**
 * Get current user info from localStorage
 * @returns {object} - { userId, email, token }
 */
export function getCurrentUser() {
  return {
    userId: localStorage.getItem('userId'),
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
  };
}

/**
 * Logout user - clear all storage and redirect to login
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('xclusiveToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  
  window.location.href = '/login';
}

// Example Usage:
// 
// // Get user profile (protected route)
// import { protectedFetch } from '@/lib/auth';
// 
// const response = await protectedFetch('http://localhost:8001/api/user/profile', {
//   method: 'GET'
// });
// 
// const data = await response.json();
// 
// // Or with POST:
// const response = await protectedFetch('http://localhost:8001/api/user/update', {
//   method: 'POST',
//   body: JSON.stringify({ name: 'John Doe' })
// });
