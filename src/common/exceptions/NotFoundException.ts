import { Exception } from './Exception';

export class NotFoundException extends Exception {
  constructor(msg = 'The requested resource is not found on this server') {
    super(msg, 404);
  }
}
