import { Router } from "express";
 import express from 'express';
import {
  getContactIDController,
  getContactsController,
  createContactController,
  deleteContactController,
  changeContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { validateBody } from '../middlewares/validateBody.js';
import { schemaContact } from '../validation/contacts.js';
import { isValidID } from "../middlewares/isValidId.js";

const router = Router();
 const jsonParser = express.json();

router.get(
  '/', ctrlWrapper(getContactsController));

router.get(
  '/:someId',
   isValidID,
  ctrlWrapper(getContactIDController),
);

router.post(
  '/',
  jsonParser,
  validateBody(schemaContact),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:someId',
  isValidID,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:someId',
  jsonParser,
  validateBody(schemaContact),
  ctrlWrapper(changeContactController),
);

export default router;

