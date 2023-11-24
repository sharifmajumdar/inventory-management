import { Schema, model } from 'mongoose';
import { Address, FullName, Order, User } from './user.iterface';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (value: string) {
        const firstNameString = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameString === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
});

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    trim: true,
    required: true,
  },
});

const orderSchema = new Schema<Order>({
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    trim: true,
    required: [true, 'User Id is required'],
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'User name is required'],
    unique: true,
    maxlength: [20, 'User name can not be more than 20 characters'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: fullNameSchema,
    trim: true,
    required: [true, 'Name is required'],
  },
  age: {
    type: Number,
    trim: true,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    maxlength: [50, 'Email can not be more than 20 characters'],
  },
  isActive: {
    type: Boolean,
    trim: true,
    required: [true, 'Active status is required'],
  },
  hobbies: {
    type: [String],
    trim: true,
    required: [true, 'Hobby is required'],
  },
  address: {
    type: addressSchema,
    trim: true,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [orderSchema],
    trim: true,
    required: [true, 'Order is required'],
  },
});

export const UserModel = model<User>('User', userSchema);
