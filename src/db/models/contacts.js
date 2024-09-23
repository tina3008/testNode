// import { Schema } from 'mongoose';
import mongoose from 'mongoose';
const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: false,
    },
    Birsday: {
      type: Date,
      default: Date.now(),
    },
    eventType: {
      type: String,
      required: false,
      enum: ['Sosial media', 'Friends', 'Found myself'],
      default: 'Sosial media',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

 const ContactsCollection = mongoose.model('contacts', contactsSchema);
export default ContactsCollection ;
