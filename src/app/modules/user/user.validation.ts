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
  productName: z.string().min(1).max(100),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

const UserValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1).max(20),
  password: z.string().min(1),
  fullName: FullNameValidationSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema),
});

export default UserValidationSchema;
