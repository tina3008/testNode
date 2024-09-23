import Joi from 'joi';

export const schemaEvent = Joi.object({
  title: Joi.string().min(3).max(20).required(),

  description: Joi.string().min(3).max(20),
  eventDate: Joi.date().required(),

  // organize: Joi.string().required(),
//  organize: Joi.object({
//   someId: Joi.string().required(),
// });
});
