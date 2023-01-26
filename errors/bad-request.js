import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-api.js';

class BadRequestError extends CustomApiError {
	constructor(message) {
		super(message);
		this.status = StatusCodes.BAD_REQUEST;
	}
}

export default BadRequestError;
