import mongoose from 'mongoose';
import validator from 'validator';

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
			validator: {
				validator: validator.isEmail,
				message: 'Please provide a valid email.',
			},
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please provide a password.'],
			minlength: 6,
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

export default mongoose.model('User', UserSchema);