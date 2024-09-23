import { isValidObjectId } from 'mongoose';
import { HttpError } from 'http-errors';

export const isValidID = (req, res, next) => {
  const { someId } = req.params;
  if (!isValidObjectId(someId)) {
    throw HttpError(404, `Not found`);
  }

  next();
};
