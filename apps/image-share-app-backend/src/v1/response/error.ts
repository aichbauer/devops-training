import { Response } from 'express';
import { ResponseTypes } from './types';

export interface ErrorResponseProps {
  res: Response;
  type: ResponseTypes;
  statusCode?: number;
  data?: Array<any>;
  message?: string;
}

export const errorResponse = ({ res, type, statusCode, data, message }: ErrorResponseProps) => {
  let errorMessage = message;

  if (!message) {
    switch (statusCode) {
      case 401:
        errorMessage = 'Unauthorized';
        break;
      case 403:
        errorMessage = 'Forbidden';
        break;
      case 404:
        errorMessage = 'Not Found';
        break;
      case 400:
      default:
        errorMessage = 'Bad Request';
        break;
    }
  }

  res.status(statusCode || 400).json({
    error: errorMessage,
    type,
    message: null,
    data: data || null,
  });
};
