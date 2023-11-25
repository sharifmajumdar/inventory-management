import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser);

router.put('/users/:userId', UserControllers.updatedUser);

router.put('/users/:userId/orders', UserControllers.addOrders);

router.get('/users/:userId/orders', UserControllers.getOrders);

router.get('/users/:userId/orders/total-price', UserControllers.getTotalPrice);

router.get('/users/:userId', UserControllers.getSingleUser);

router.get('/users', UserControllers.getAllUsers);

router.delete('/users/:userId', UserControllers.deleteUser);

export const UserRoutes = router;
