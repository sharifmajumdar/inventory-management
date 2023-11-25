import { TUser } from './user.iterface';
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
  const result = await User.findOneAndUpdate({ userId }, updatedFields, {
    new: true,
  }).select('-password');
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
