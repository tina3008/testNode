import EventCollection from '../db/models/events.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

const getAllEvents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const eventQuery = EventCollection.find();

  if (filter.isFavourite) {
    eventQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.eventType) {
    eventQuery.where('eventType').equals(filter.eventType);
  }

  const [eventCount, events] = await Promise.all([
    EventCollection.find().merge(eventQuery).countDocuments(),
    eventQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(eventCount, perPage, page);

  return {
    data: events,
    ...paginationData,
  };
};

function getEventById(eventId) {
  return EventCollection.findById(eventId);
}

function createEvent(event) {
  return EventCollection.create(event);
}

function deleteEvent(eventId) {
  return EventCollection.findByIdAndDelete(eventId);
}

const patchEvent = async (eventId, payload, options) => {
  const rawResult = await EventCollection.findOneAndUpdate(
    { _id: eventId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export { getAllEvents, getEventById, createEvent, deleteEvent, patchEvent };
