import { Request, Response } from 'express';
import { UserServices } from './user.service';
import UserValidationSchema from './user.validation';
import { Error as MongooseError } from 'mongoose';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // Data validation using zod
    const zodParsedData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: {
          name: error.name,
          message: error.message,
        },
      });
    }
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: {
          name: error.name,
          message: error.message,
        },
      });
    }
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: {
          name: error.name,
          message: error.message,
        },
      });
    }
  }
};

const updatedUser = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    const { user: userData } = req.body;
    const result = await UserServices.updateUserInDB(userId, userData);

    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: {
          name: error.name,
          message: error.message,
        },
      });
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const getId = req.params.userId;
    const userId = parseInt(getId);
    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: {
          name: error.name,
          message: error.message,
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
  deleteUser,
};
