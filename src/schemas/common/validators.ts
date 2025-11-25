import * as y from "yup";

/**
 * Custom validator for Vietnamese phone numbers
 * @param value - Phone number to validate
 * @returns true if valid, false otherwise
 */
export const isVietnamesePhone = (value?: string): boolean => {
  if (!value) return true; // Optional field
  return /^(0|\+84)[0-9]{9}$/.test(value);
};

/**
 * Custom validator for strong passwords
 * @description Checks for uppercase, lowercase, number, and special character
 */
export const isStrongPassword = (value?: string): boolean => {
  if (!value) return false;
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    value,
  );
};

/**
 * Custom validator for alphanumeric strings
 */
export const isAlphanumeric = (value?: string): boolean => {
  if (!value) return true;
  return /^[a-zA-Z0-9]+$/.test(value);
};

/**
 * Custom validator for slug format (URL-friendly strings)
 */
export const isSlug = (value?: string): boolean => {
  if (!value) return true;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
};

/**
 * Yup test for password confirmation
 * @description Use with .test() method to validate password match
 */
export const passwordConfirmationTest = y
  .string()
  .oneOf([y.ref("password")], "Mật khẩu không khớp")
  .required("Xác nhận mật khẩu là bắt buộc");

/**
 * Custom validator for file size
 * @param maxSizeInMB - Maximum file size in megabytes
 */
export const validateFileSize = (maxSizeInMB: number) => {
  return (file?: File): boolean => {
    if (!file) return true;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  };
};

/**
 * Custom validator for file type
 * @param allowedTypes - Array of allowed MIME types
 */
export const validateFileType = (allowedTypes: string[]) => {
  return (file?: File): boolean => {
    if (!file) return true;
    return allowedTypes.includes(file.type);
  };
};

/**
 * Custom validator for image files
 */
export const isImageFile = (file?: File): boolean => {
  if (!file) return true;
  return file.type.startsWith("image/");
};

/**
 * Custom validator for date range
 * @param startDate - Start date field reference
 * @param endDate - End date field reference
 */
export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate <= endDate;
};

/**
 * Custom validator for age requirement
 * @param minAge - Minimum age required
 */
export const validateAge = (minAge: number) => {
  return (birthDate?: Date): boolean => {
    if (!birthDate) return false;
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= minAge;
    }

    return age >= minAge;
  };
};

/**
 * Custom validator for Vietnamese ID card number
 * @description Validates 9 or 12 digit ID card numbers
 */
export const isVietnameseIDCard = (value?: string): boolean => {
  if (!value) return true;
  return /^[0-9]{9}$|^[0-9]{12}$/.test(value);
};

/**
 * Custom validator for credit card number (basic Luhn algorithm)
 */
export const isCreditCard = (value?: string): boolean => {
  if (!value) return true;

  // Remove spaces and dashes
  const cardNumber = value.replace(/[\s-]/g, "");

  if (!/^\d{13,19}$/.test(cardNumber)) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Custom validator for postal code (Vietnam)
 */
export const isVietnamesePostalCode = (value?: string): boolean => {
  if (!value) return true;
  return /^[0-9]{6}$/.test(value);
};

/**
 * Custom validator for hex color code
 */
export const isHexColor = (value?: string): boolean => {
  if (!value) return true;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
};

/**
 * Custom validator for IPv4 address
 */
export const isIPv4 = (value?: string): boolean => {
  if (!value) return true;
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    value,
  );
};
