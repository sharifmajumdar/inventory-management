import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidationSchema } from './user.validation';
import { Error as MongooseError } from 'mongoose';
import { User } from './user.model';
import { TUser } from './user.iterface';

// Creating a new user controller
const createUser = async (req: Request, res: Response) => {
  try {
    const userData: TUser = req.body;

    // Data validation using zod
    const zodParsedData =
      UserValidationSchema.createUserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParsedData);
    const resData = await User.findById(result._id).select('-password'); // To skip the password field in the reponse

    const responseData = {
      userId: resData?.userId,
      username: resData?.username,
      fullName: {
        firstName: resData?.fullName.firstName,
        lastName: resData?.fullName.lastName,
      },
      age: resData?.age,
      email: resData?.email,
      isActive: resData?.isActive,
      hobbies: resData?.hobbies?.map((hob) => hob),
      address: {
        street: resData?.address.street,
        city: resData?.address.city,
        country: resData?.address.country,
      },
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: responseData,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User already exists!') {
      res.status(409).json({
        success: false,
        message: error.message,
        error: {
          code: 409,
          description: 'Conflict - User already exists!',
        },
      });
    } else if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad request',
        error: {
          code: 400,
          description: 'Bad request',
        },
      });
    }
  }
};

// Find all users controller
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const results = await UserServices.getAllUsersFromDB();

    const responseData = results.map((result: Partial<TUser>) => ({
      username: result.username || '',
      fullName: {
        firstName: result.fullName?.firstName || '',
        lastName: result.fullName?.lastName || '',
      },
      age: result.age || 0,
      email: result.email || '',
      address: {
        street: result.address?.street || '',
        city: result.address?.city || '',
        country: result.address?.country || '',
      },
    }));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: responseData,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  }
};

// Get a single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId); // Parsing string data into integer
    const result = await UserServices.getSingleUserFromDB(userId);

    const responseData = {
      userId: result?.userId,
      username: result?.username,
      fullName: {
        firstName: result?.fullName.firstName,
        lastName: result?.fullName.lastName,
      },
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies?.map((hob) => hob),
      address: {
        street: result?.address.street,
        city: result?.address.city,
        country: result?.address.country,
      },
    };

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: responseData,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User not found!') {
      res.status(409).json({
        success: false,
        message: error.message,
        error: {
          code: 409,
          description: 'Conflict - User is not found in the database!',
        },
      });
    } else if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad request',
        error: {
          code: 400,
          description: 'Bad request',
        },
      });
    }
  }
};

// A controller to update a single user
const updatedUser = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    const userData = req.body;
    const zodParsedData =
      UserValidationSchema.updateUserValidationSchema.parse(userData);
    const result = await UserServices.updateUserInDB(userId, zodParsedData);

    const responseData = {
      userId: result?.userId,
      username: result?.username,
      fullName: {
        firstName: result?.fullName.firstName,
        lastName: result?.fullName.lastName,
      },
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies?.map((hob) => hob),
      address: {
        street: result?.address.street,
        city: result?.address.city,
        country: result?.address.country,
      },
    };

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: responseData,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User not found!') {
      res.status(409).json({
        success: false,
        message: error.message,
        error: {
          code: 409,
          description: 'Conflict - User is not found in the database!',
        },
      });
    } else if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad request',
        error: {
          code: 400,
          description: 'Bad request',
        },
      });
    }
  }
};

// Deleting a single user from database
const deleteUser = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User not found!') {
      res.status(409).json({
        success: false,
        message: error.message,
        error: {
          code: 409,
          description: 'Conflict - User is not found in the database!',
        },
      });
    } else if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad request',
        error: {
          code: 400,
          description: 'Bad request',
        },
      });
    }
  }
};

// A controller to append new orders
const addOrders = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    const userData = req.body;
    const zodParsedData =
      UserValidationSchema.addOrdersValidationSchema.parse(userData);
    await UserServices.addOrderIntoDB(userId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User not found!') {
      res.status(409).json({
        success: false,
        message: error.message,
        error: {
          code: 409,
          description: 'Conflict - User is not found in the database!',
        },
      });
    } else if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad request',
        error: {
          code: 400,
          description: 'Bad request',
        },
      });
    }
  }
};

// Get all orders for a specific user
const getOrders = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    const result = await UserServices.getOrdersFromDB(userId);
    const resData = {
      orders: result?.orders?.map((order) => ({
        productName: order?.productName,
        price: order?.price,
        quantity: order?.quantity,
      })),
    };

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: resData,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User not found!') {
      res.status(409).json({
        success: false,
        message: error.message,
        error: {
          code: 409,
          description: 'Conflict - User is not found in the database!',
        },
      });
    } else if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad request',
        error: {
          code: 400,
          description: 'Bad request',
        },
      });
    }
  }
};

// Calculating total cost of a single user's orders
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    const result = await UserServices.getTotalPriceFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User not found!') {
      res.status(409).json({
        success: false,
        message: error.message,
        error: {
          code: 409,
          description: 'Conflict - User is not found in the database!',
        },
      });
    } else if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: {
          code: 500,
          description: 'Internal server error',
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad request',
        error: {
          code: 400,
          description: 'Bad request',
        },
      });
    }
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updatedUser,
  addOrders,
  getOrders,
  getTotalPrice,
  deleteUser,
};
