import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser); // Route for creating a data

router.put('/users/:userId', UserControllers.updatedUser); // PUT route for updating a data

router.put('/users/:userId/orders', UserControllers.addOrders); // A route to append an order for a specific user

router.get('/users/:userId/orders', UserControllers.getOrders); // A route to get the all orders for a specific user

router.get('/users/:userId/orders/total-price', UserControllers.getTotalPrice); // A route to get the total cost of orders for a single user

router.get('/users/:userId', UserControllers.getSingleUser); // A route to get the single user

router.get('/users', UserControllers.getAllUsers); // A get route to find the all users

router.delete('/users/:userId', UserControllers.deleteUser); // Delete route

export const UserRoutes = router;
