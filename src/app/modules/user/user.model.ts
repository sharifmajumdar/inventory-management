import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser, UserModel } from './user.iterface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
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

const addressSchema = new Schema<TAddress>({
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

const orderSchema = new Schema<TOrder>({
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

const userSchema = new Schema<TUser, UserModel>({
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Pre save middleware
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Creating custom static method for data exists
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
