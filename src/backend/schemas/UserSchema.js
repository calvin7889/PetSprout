const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		status: {
			type: Number,
			required: true,
		},
		pending_password: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			default: '',
		},
		lastlogin: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const userSchema = mongoose.model('user', UserSchema);
module.exports = userSchema;
