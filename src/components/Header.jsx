import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import { Button } from './UI/Button';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export const Header = () => {
	const { items } = useContext(CartContext);
	const userProgressCtx = useContext(UserProgressContext);

	//запомни!!!!!!!!!!!!!!!!!!!
	const totalQuantity = items.reduce((totalNumber, item) => {
		return totalNumber + item.quantity;
	}, 0);

	const handleShowCart = () => {
		userProgressCtx.showCart();
	};

	return (
		<header id="main-header">
			<div id="title">
				<img src={logoImg} alt="A restaurant" />
				<h1>ReactFood</h1>
			</div>
			<nav>
				<Button textOnly onClick={handleShowCart}>
					Cart ({totalQuantity})
				</Button>
			</nav>
		</header>
	);
};
