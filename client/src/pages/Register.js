import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

const Register = () => {
	const [values, setValues] = useState(initialState);

	const { isLoading, showAlert, displayAlert } = useAppContext();

	const handleChange = e => {
		setValues(prevState => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		const { name, email, password, isMember } = values;

		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}

		console.log(values);
	};

	const toggleMember = () => {
		setValues(prevState => {
			return { ...prevState, isMember: !prevState.isMember };
		});
	};

	return (
		<Wrapper className="full-page">
			<form
				className="form"
				onSubmit={handleSubmit}
			>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>

				{showAlert && <Alert alertText="Invalid credentials" />}

				{!values.isMember && (
					<FormRow
						type="text"
						name="name"
						value={values.name}
						handleChange={handleChange}
						labelText="Name"
					/>
				)}

				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
					labelText="Email"
				/>

				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={handleChange}
					labelText="Password"
				/>

				<button
					type="submit"
					className="btn btn-block"
				>
					Submit
				</button>

				<p>
					{values.isMember ? 'Not a member yet?' : 'Already a member?'}

					<button
						type="button"
						onClick={toggleMember}
						className="member-btn"
					>
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};
export default Register;
