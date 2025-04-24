import express from 'express';
import registerUser from '../controllers/usercontroller.js';
import  reserveTable from '../controllers/reservingTable.js';
import loginUser from '../controllers/login.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/booking', reserveTable);
router.post('/login', loginUser);


export default router;

