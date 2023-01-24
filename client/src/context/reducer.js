import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

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
	throw new Error(`No such action type: ${action.type}`);
};

export default reducer;
