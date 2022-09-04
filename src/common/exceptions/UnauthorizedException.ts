import { Exception } from './Exception';

export class UnauthorizedException extends Exception {
  constructor(msg = 'Unauthorized') {
    super(msg, 401);
  }
}
