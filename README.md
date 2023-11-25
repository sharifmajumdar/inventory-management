## Online invetory store

A online based inventory management system (backend) where the aim was to design a sample CRUD operation APIs with proper validation.

# Technology used

1. Node
2. Express
3. MongoDB
4. Mongoose
5. TypeScript

# Features

1. Create a user
2. Get all users
3. Get single user
4. Update a user
5. Delete a user
6. Add an order
7. List of orders
8. Calculate price

# Design patter

In this project, the moduler patter has been applied

# Validation

There are three layer validation like typescript, mongoose and zod. For password hashing, the Bcrypt dependency has been applied.

# List of routes:

router.post('/users', UserControllers.createUser);
router.put('/users/:userId', UserControllers.updatedUser);
router.put('/users/:userId/orders', UserControllers.addOrders);
router.get('/users/:userId/orders', UserControllers.getOrders);
router.get('/users/:userId/orders/total-price', UserControllers.getTotalPrice);
router.get('/users/:userId', UserControllers.getSingleUser);
router.get('/users', UserControllers.getAllUsers);
router.delete('/users/:userId', UserControllers.deleteUser);

# Running instruction

Since it is just a backend APIs design, it would be worth to use locally to order to get the better experience. For instance, there are some external apps like postman, insomnia ans so on to test the sample APIs. So, according to the above routes, the designs APIs could be tested locally.

GitHub link: https://github.com/sharifmajumdar/inventory-management
Deployed link: https://inventory-management-umber.vercel.app/
