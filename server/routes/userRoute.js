import express from 'express';
import { userController, updateUser, deleteUser, getUserList } from '../controllers/userController.js';
import verifyToken from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', userController);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/list/:id', verifyToken, getUserList);

export default router;
