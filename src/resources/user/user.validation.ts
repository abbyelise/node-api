import Joi from 'joi';

const create = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  role: Joi.string().required(),
});

export default { create };