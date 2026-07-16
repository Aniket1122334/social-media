const Joi = require("joi");

const signupValidation = Joi.object({
  fullname: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z ]+$/)
    .required()
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters",
      "string.max": "Full name cannot exceed 50 characters",
      "string.pattern.base": "Full name should contain only letters and spaces",
    }),

  username: Joi.string()
    .trim()
    .lowercase()
    .min(3)
    .max(20)
    .pattern(/^(?!.*\.\.)(?!.*__$)[a-z0-9._]+$/)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
      "string.max": "Username cannot exceed 20 characters",
      "string.pattern.base": "Invalid username format",
    }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),

  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number and special character",
    }),

  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm Password is required",
  }),
});

const loginValidation = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

module.exports = {
  signupValidation,
  loginValidation,
};
