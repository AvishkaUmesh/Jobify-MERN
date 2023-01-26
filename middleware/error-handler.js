import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
	console.log(err);

	const defaultError = {
		status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
		message: err.message || 'An error occurred',
	};

	if (err.name === 'ValidationError') {
		defaultError.status = StatusCodes.BAD_REQUEST;
		// defaultError.message = err.message;
		defaultError.message = Object.values(err.errors)
			.map(val => val.message)
			.join(',');
	}

	if (err.code && err.code === 11000) {
		defaultError.status = StatusCodes.BAD_REQUEST;
		defaultError.message = `${Object.keys(err.keyValue)} is already taken`;
	}

	// res.status(defaultError.status).json({ message: err });
	res.status(defaultError.status).json({ message: defaultError.message });
};

export default errorHandlerMiddleware;
