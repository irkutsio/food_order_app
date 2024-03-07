import { currenceFormatter } from '../util/formatting';

export const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
	return (
		<li className="cart-item">
			<p>
				{name} - {quantity} x {currenceFormatter.format(price)}
			</p>
			<p className="cart-item-actions">
				<button onClick={onIncrease}>+</button>
				<span>{quantity}</span>
				<button onClick={onDecrease}>-</button>
			</p>
		</li>
	);
};
