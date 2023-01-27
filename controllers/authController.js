import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import User from '../models/User.js';

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new BadRequestError('Please enter all fields');
	}

	const userAlreadyExist = await User.findOne({ email });
	if (userAlreadyExist) {
		throw new BadRequestError('User already exists');
	}

	const user = await User.create({ name, email, password });
	const token = await user.createJWT();
	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name,
			email: user.email,
			lastName: user.lastName,
			location: user.location,
		},
		token,
		location: user.location,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please enter all fields');
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const isMatch = await user.comparePasswords(password);
	if (!isMatch) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const token = await user.createJWT();
	user.password = undefined;
	res.status(StatusCodes.OK).json({
		user,
		token,
		location: user.location,
	});
};

const updateUser = async (req, res) => {
	res.send('Update User');
};

export { register, login, updateUser };
