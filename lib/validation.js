// Validation utilities

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password 
 * @returns {object} { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  // Optional: Add more strength requirements
  // if (!/[A-Z]/.test(password)) {
  //   return {
  //     isValid: false,
  //     message: 'Password must contain at least one uppercase letter'
  //   };
  // }
  
  // if (!/[a-z]/.test(password)) {
  //   return {
  //     isValid: false,
  //     message: 'Password must contain at least one lowercase letter'
  //   };
  // }
  
  // if (!/[0-9]/.test(password)) {
  //   return {
  //     isValid: false,
  //     message: 'Password must contain at least one number'
  //   };
  // }
  
  return {
    isValid: true,
    message: 'Password is valid'
  };
};

/**
 * Validate registration form
 * @param {object} formData 
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  // Confirm password validation
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
