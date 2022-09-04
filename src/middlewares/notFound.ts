import { RequestHandler } from 'express';

import { NotFoundException } from '@/common/exceptions/NotFoundException';

export const notFound: RequestHandler = ({ originalUrl }, res) => {
  const exception = new NotFoundException();
  exception.path = originalUrl;
  return res.send(exception).status(404);
};
