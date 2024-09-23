import Joi from 'joi';

export const schemaContact = Joi.object({
  name: Joi.string().min(3).max(20).required(),

  email: Joi.string()
    .min(3)
    .max(20)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),

  Birsday: Joi.date(),

  eventType: Joi.string()
    .valid('Sosial media', 'Friends', 'Found myself')
    
});
