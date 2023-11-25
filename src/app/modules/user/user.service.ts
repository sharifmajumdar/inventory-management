import { TUser, TOrder } from './user.iterface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({}, 'username fullName age email address');
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User is not exists');
  }

  const result = await User.findOne(
    { userId },
    'userId username fullName age email isActive hobbies address',
  );
  return result;
};

const updateUserInDB = async (
  userId: number,
  updatedFields: Partial<TUser>,
) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User is not exists');
  }

  const result = await User.findOneAndUpdate({ userId }, updatedFields, {
    new: true,
  }).select('-password');
  return result;
};

const addOrderIntoDB = async (userId: number, updatedFields: TOrder) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User is not exists');
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

const getOrdersFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User is not exists');
  }

  const result = await User.findOne({ userId }, 'orders');
  return result;
};

const getTotalPriceFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User is not exists');
  }

  const result = await User.findOne({ userId }, 'orders');

  const totalPrice = result?.orders.reduce((acc, order) => {
    const { price, quantity } = order;
    return acc + price * quantity;
  }, 0);

  return { totalPrice: totalPrice };
};

const deleteUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new Error('User is not exists');
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
