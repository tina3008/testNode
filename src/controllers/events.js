import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  patchEvent,
} from '../services/events.js';
import { createContact, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import ContactsCollection from '../db/models/contacts.js';
import { schemaContact } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';

export const getEventController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const events = await getAllEvents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found Events!',
    data: events,
  });
};

export const getEventIDController = async (req, res, next) => {
  const { someId } = req.params;
  const event = await getEventById(someId);

  if (!event) {
    throw createHttpError(404, `Event not found, ${someId}`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found event with id ${someId}!`,
    data: event,
  });
};

export const createEventController = async (req, res) => {
  const event = await createEvent(req.body);
  res.status(200).json({
    status: 200,
    message: 'Successfully created a event!',
    data: event,
  });
};

export const deleteEventController = async (req, res) => {
  const { someId } = req.params;

  const event = await deleteEvent(someId);

  if (!event) {
    throw createHttpError(404, 'Event not found');
  }

  res.status(201).send({
    status: 201,
    message: 'Successfully patched a Event!',
    data: event,
  });
};

export const changeEventController = async (req, res, next) => {
  const { someId } = req.params;
  const result = await patchEvent(someId, req.body);

  if (!result) {
    next(createHttpError(404, `Event not found ${someId}`));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a Event!',
    data: result.event,
  });
};

export const addContactToEvenController = async (req, res) => {
  const { someId } = req.params;
  const contact = req.body;


  const event = await getEventById(someId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
if (!contact.email) {
  return res
    .status(400)
    .json({ message: `Incorrect contact info` });
}
const existinContact = await ContactsCollection.findOne({
  email: contact.email
});


  if (!existinContact) {
    if (validateBody(schemaContact)) {
      const createdContact = await ContactsCollection.create(contact);
 event.attendees.push(createdContact._id);
 await event.save();
    } else {
      res.status(400).json({ message: 'Incorrect contact info' });
    }
  }



  res.status(200).json({ message: 'Contact was added to event' });
};

export const viewContactListController = async (req, res) => {
  const { someId } = req.params;
  const event = await getEventById(someId);

  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
const contacts = await ContactsCollection.find(event.attendees._id);

  res.status(200).json({ contacts });
};
