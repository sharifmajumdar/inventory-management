import { Model } from 'mongoose';

// Creating fullName type
export type TFullName = {
  firstName: string;
  lastName: string;
};

// Creating address type
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

// Creating order type
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

// Create a type representing a document in MongoDB
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrder[];
  isDeleted: boolean;
};

// Creating an iterface for checking existing user using static
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
