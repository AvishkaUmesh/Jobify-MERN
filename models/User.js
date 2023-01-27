import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a name.'],
			trim: true,
			minlength: 3,
			maxlength: 20,
		},
		email: {
			type: String,
			required: [true, 'Please provide an email.'],
			validate: {
				validator: validator.isEmail,
				message: 'Please provide a valid email.',
			},
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please provide a password.'],
			minlength: 6,
			select: false,
		},
		lastName: {
			type: String,
			trim: true,
			minlength: 3,
			maxlength: 20,
			default: 'last name',
		},
		location: {
			type: String,
			trim: true,
			maxlength: 20,
			default: 'location',
		},
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

UserSchema.methods.comparePasswords = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

export default mongoose.model('User', UserSchema);
