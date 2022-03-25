export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const validateErrorMessages = {
  email: 'Please provide a valid email',
  password:
    'Password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
}
