const Joi = require("joi");

const postValidation = Joi.object({
  caption: Joi.string().trim().allow("").optional(),

  postType: Joi.string().valid("post", "reel").required().messages({
    "any.only": "Post type must be either post or reel.",
    "string.empty": "Post type is required.",
    "any.required": "Post type is required.",
  }),
});

module.exports = { postValidation };
