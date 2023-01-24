import { Logo } from '../components';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				{/* info section */}
				<div className="info">
					<h1>
						Job <span>Tracking </span>
						app
					</h1>

					<p>
						Velit non officia laboris elit incididunt est. Officia laboris, elit incididunt est. Incididunt
						est sunt aute magna culpa adipiscing deserunt. Sunt aute magna culpa adipiscing deserunt velit,
						lorem. Culpa adipiscing deserunt, velit lorem.
					</p>
					<Link
						to="/register"
						className="btn btn-hero"
					>
						Login/Register
					</Link>
				</div>

				{/* image */}
				<img
					src={main}
					alt="main"
					className="img main-img"
				/>
			</div>
		</Wrapper>
	);
};

export default Landing;
