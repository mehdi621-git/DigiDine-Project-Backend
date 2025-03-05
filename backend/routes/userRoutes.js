import express from 'express';
import registerUser from '../controllers/usercontroller.js';
import  reserveTable from '../controllers/reservingTable.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/booking', reserveTable);


export default router;

