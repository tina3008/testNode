import { Router } from 'express';
import contactsRouter from './contacts.js';
import eventRouter from './events.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/events', eventRouter);

export default router;
