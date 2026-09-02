const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;
const NAME_PATTERN = /^[a-zA-Z][a-zA-Z '-]{1,49}$/;

export const emailError = (email) =>
  EMAIL_PATTERN.test(email.trim()) ? "" : "Enter a valid email address.";

export const passwordError = (password) => {
  if (password.length < 8 || password.length > 72) return "Password must be between 8 and 72 characters.";
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return "Password must include an uppercase letter, lowercase letter, and number.";
  }
  return "";
};

export const registrationErrors = (form, accepted) => {
  const errors = {};
  if (!NAME_PATTERN.test(form.firstName.trim())) errors.firstName = "Enter a valid first name.";
  if (!NAME_PATTERN.test(form.lastName.trim())) errors.lastName = "Enter a valid last name.";
  const email = emailError(form.email);
  if (email) errors.email = email;
  if (!PHONE_PATTERN.test(form.phoneNumber.trim())) errors.phoneNumber = "Use international format, e.g. +2348000000000.";
  const password = passwordError(form.password);
  if (password) errors.password = password;
  if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  if (!accepted) errors.accepted = "You must accept the Terms of Service and Privacy Policy.";
  return errors;
};
