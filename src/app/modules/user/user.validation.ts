import { z } from 'zod';

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(50)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be capitalized',
      },
    ),
  lastName: z.string().min(1).max(50),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
});

const OrderValidationSchema = z.object({
  productName: z.string().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  quantity: z.number().min(1).optional(),
});

const createUserValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1).max(20),
  password: z.string().min(1),
  fullName: FullNameValidationSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
});

const updateUserValidationSchema = z.object({
  userId: z.number().min(1).optional(),
  username: z.string().min(1).max(20).optional(),
  password: z.string().min(1).optional(),
  fullName: FullNameValidationSchema.optional(),
  age: z.number().min(1).optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string().min(1)).optional(),
  address: AddressValidationSchema.optional(),
  orders: z.array(OrderValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
});

const addOrdersValidationSchema = z.object({
  productName: z.string().optional(),
  price: z.number().min(1).optional(),
  quantity: z.number().min(1).optional(),
});

export const UserValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
  addOrdersValidationSchema,
};
