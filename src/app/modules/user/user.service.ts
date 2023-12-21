import { TUser, TOrder } from './user.iterface';
import { User } from './user.model';

// Creating a new user into database
const createUserIntoDB = async (userData: TUser) => {
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  /*   if (await User.isUserExists(userData.userId)) {
    // Checking whether data is already exists
    throw new Error('User already exists!');
  } */
  const result = await User.create(userData);
  return result;
};

// Getting all users from database
const getAllUsersFromDB = async () => {
  const result = await User.find({}, 'username fullName age email address');
  return result;
};

// Fetching single user from database
const getSingleUserFromDB = async (userId: number) => {
  /*   if (!(await User.isUserExists(userId))) {
    throw new Error('User is not exists');
  } */
  const user = new User(userId);
  if (!(await user.isUserExists(userId))) {
    throw new Error('User is not exists!');
  }

  const result = await User.findOne(
    { userId },
    'userId username fullName age email isActive hobbies address',
  );
  return result;
};

// Update a single user by fetching first
const updateUserInDB = async (
  userId: number,
  updatedFields: Partial<TUser>,
) => {
  const user = new User(userId);
  if (!(await user.isUserExists(userId))) {
    throw new Error('User is not exists!');
  }

  const result = await User.findOneAndUpdate({ userId }, updatedFields, {
    new: true,
  }).select('-password');
  return result;
};

// Appending a new order into the orders field
const addOrderIntoDB = async (userId: number, updatedFields: TOrder) => {
  const user = new User(userId);
  if (!(await user.isUserExists(userId))) {
    throw new Error('User is not exists!');
  }

  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: updatedFields } },
    {
      new: true,
    },
  ).select('-password');
  return result;
};

// Fetching all orders for a specific user
const getOrdersFromDB = async (userId: number) => {
  const user = new User(userId);
  if (!(await user.isUserExists(userId))) {
    throw new Error('User is not exists!');
  }

  const result = await User.findOne({ userId }, 'orders');
  return result;
};

// Calculating total cost for a single user's orders
const getTotalPriceFromDB = async (userId: number) => {
  const user = new User(userId);
  if (!(await user.isUserExists(userId))) {
    throw new Error('User is not exists!');
  }

  const result = await User.findOne({ userId }, 'orders');

  const totalPrice = result?.orders?.reduce((acc, order) => {
    const { price, quantity } = order || {};
    if (price !== undefined && quantity !== undefined) {
      return acc + price * quantity;
    }
    return acc;
  }, 0);

  return { totalPrice: totalPrice };
};

// Deleting a single user from database
const deleteUserFromDB = async (userId: number) => {
  const user = new User(userId);
  if (!(await user.isUserExists(userId))) {
    throw new Error('User is not exists!');
  }

  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  addOrderIntoDB,
  getOrdersFromDB,
  getTotalPriceFromDB,
  deleteUserFromDB,
};
