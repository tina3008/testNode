import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactIDController = async (req, res, next) => {
  const { someId } = req.params;
  const contact = await getContactById(someId);

  if (!contact) {
    throw createHttpError(404, `Contact not found, ${someId}`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${someId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(200).json({
    status: 200,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { someId } = req.params;

  const contact = await deleteContact(someId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res
    .status(201)
    .send({
      status: 201,
      message: 'Successfully patched a contact!',
      data: contact,
    });
};

export const changeContactController = async (req, res, next) => {
  const { someId } = req.params;
  const result = await patchContact(someId, req.body);

  if (!result) {
    next(createHttpError(404, `Contact not found ${someId}`));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};
