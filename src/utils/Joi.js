const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().alphanum().min(6).max(30).email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
});
