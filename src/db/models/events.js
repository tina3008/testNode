import mongoose from 'mongoose';

const eventsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    organize: {
      type: String,
      required: true,
    },

    attendees: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'ContactsCollection' },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const eventCollection = mongoose.model('events', eventsSchema);
export default eventCollection;
