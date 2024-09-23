import { Router } from 'express';
import express from 'express';
import {
  getEventIDController,
  getEventController,
  createEventController,
  deleteEventController,
  changeEventController,
  addContactToEvenController,
  viewContactListController,
} from '../controllers/events.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { schemaEvent } from '../validation/events.js';
import { isValidID } from '../middlewares/isValidId.js';

const router = Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getEventController));

router.get('/:someId', isValidID, ctrlWrapper(getEventIDController));

router.post(
  '/',
  jsonParser,
  validateBody(schemaEvent),
  ctrlWrapper(createEventController),
);

router.delete('/:eventId', isValidID, ctrlWrapper(deleteEventController));
router.patch(
  '/:someId',
  jsonParser,
  validateBody(schemaEvent),
  ctrlWrapper(changeEventController),
);

router.post('/:someId/add', isValidID, ctrlWrapper(addContactToEvenController));

router.get('/:someId/attendees', isValidID, ctrlWrapper(viewContactListController) );

export default router;
