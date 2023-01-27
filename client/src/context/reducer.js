import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './actions';

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertText: 'Please enter a valid email and password',
			alertType: 'danger',
		};
	}
	if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertText: '',
			alertType: '',
		};
	}
	if (action.type === REGISTER_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (action.type === REGISTER_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			showAlert: true,
			alertText: 'Registration successful! Redirecting...',
			alertType: 'success',
		};
	}
	if (action.type === REGISTER_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertText: action.payload.message,
			alertType: 'danger',
		};
	}
	throw new Error(`No such action type: ${action.type}`);
};

export default reducer;
