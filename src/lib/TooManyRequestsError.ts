import { HttpError } from 'routing-controllers';

export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too Many Requests') {
    super(429, message);
    this.name = 'TooManyRequestsError';
  }
}
