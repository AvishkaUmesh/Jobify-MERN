import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
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
	res.send('Login');
};

const updateUser = async (req, res) => {
	res.send('Update User');
};

export { register, login, updateUser };
