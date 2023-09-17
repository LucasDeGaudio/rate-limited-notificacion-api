import { Response } from 'express';

export const resolveResponse = (
  res: Response,
  statusCode: number,
  response: { [key: string]: any },
) => {
  res.status(statusCode).json(response);
};
