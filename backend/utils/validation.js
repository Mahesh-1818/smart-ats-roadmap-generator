/**
 * Input Validation Utilities
 * Reusable validation functions for common use cases
 */

const CONSTANTS = require("../constants/constants");

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = (email) => {
  return CONSTANTS.VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      message: "Password is required",
    };
  }

  if (password.length < CONSTANTS.VALIDATION.PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${CONSTANTS.VALIDATION.PASSWORD_MIN_LENGTH} characters long`,
    };
  }

  return {
    isValid: true,
    message: "Password is valid",
  };
};

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {object} Validation result with isValid and message
 */
const validateName = (name) => {
  if (!name || typeof name !== "string") {
    return {
      isValid: false,
      message: "Name must be a non-empty string",
    };
  }

  const trimmed = name.trim();

  if (trimmed.length < CONSTANTS.VALIDATION.NAME_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Name must be at least ${CONSTANTS.VALIDATION.NAME_MIN_LENGTH} characters long`,
    };
  }

  if (trimmed.length > CONSTANTS.VALIDATION.NAME_MAX_LENGTH) {
    return {
      isValid: false,
      message: `Name cannot exceed ${CONSTANTS.VALIDATION.NAME_MAX_LENGTH} characters`,
    };
  }

  return {
    isValid: true,
    message: "Name is valid",
  };
};

/**
 * Validate registration input
 * @param {object} data - Registration data
 * @returns {object} Validation result
 */
const validateRegistration = (data) => {
  const { name, email, password } = data;

  // Validate name
  const nameValidation = validateName(name);
  if (!nameValidation.isValid) {
    return nameValidation;
  }

  // Validate email
  if (!email || !isValidEmail(email)) {
    return {
      isValid: false,
      message: "Please provide a valid email address",
    };
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return {
    isValid: true,
    message: "All inputs are valid",
  };
};

/**
 * Validate login input
 * @param {object} data - Login data
 * @returns {object} Validation result
 */
const validateLogin = (data) => {
  const { email, password } = data;

  if (!email || !isValidEmail(email)) {
    return {
      isValid: false,
      message: "Please provide a valid email address",
    };
  }

  if (!password) {
    return {
      isValid: false,
      message: "Password is required",
    };
  }

  return {
    isValid: true,
    message: "Login inputs are valid",
  };
};

/**
 * Validate MongoDB ObjectId
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid ObjectId
 */
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

module.exports = {
  isValidEmail,
  validatePassword,
  validateName,
  validateRegistration,
  validateLogin,
  isValidObjectId,
};
