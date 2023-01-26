import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import User from '../models/User.js';

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new BadRequestError('Please enter all fields');
	}

	const userAlreadyExist = User.findOne({ email });
	if (userAlreadyExist) {
		throw new BadRequestError('User already exists');
	}

	const user = await User.create({ name, email, password });
	res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
	res.send('Login');
};

const updateUser = async (req, res) => {
	res.send('Update User');
};

export { register, login, updateUser };
