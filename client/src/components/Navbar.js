import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';

const Navbar = () => {
	const { user, logoutUser, toggleSidebar } = useAppContext();
	const [showLogout, setShowLogout] = useState(false);

	const toggleDropdown = () => {
		setShowLogout(!showLogout);
	};

	return (
		<Wrapper>
			<div className="nav-center">
				<button
					type="button"
					className="toggle-btn"
					onClick={toggleSidebar}
				>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className="logo-text">Dashboard</h3>
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={toggleDropdown}
					>
						<FaUserCircle />
						{user && user.name}
						<FaCaretDown />
					</button>

					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button
							type="button"
							onClick={logoutUser}
							className="dropdown-btn"
						>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
