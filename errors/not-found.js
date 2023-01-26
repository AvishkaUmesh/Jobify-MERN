import { StatusCodes } from 'http-status-codes';
import CustomApiError from './custom-api.js';

class NotFoundError extends CustomApiError {
	constructor(message) {
		super(message);
		this.status = StatusCodes.NOT_FOUND;
	}
}

export default NotFoundError;
