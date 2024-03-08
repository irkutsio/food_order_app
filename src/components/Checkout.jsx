import { useContext } from 'react';
import { Modal } from './UI/Modal';
import { CartContext } from '../store/CartContext';
import { currenceFormatter } from '../util/formatting';
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import { UserProgressContext } from '../store/UserProgressContext';
import { useHttp } from '../hooks/useHttp';
import { Error } from './Error';

const requestConfig = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
};

export const Checkout = () => {
	const { items } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);

	const {
		data,
		isLoading: isSending,
		error,
		sendRequest,
	} = useHttp('http://localhost:3000/orders', requestConfig);

	const cartTotal = items.reduce((total, item) => {
		return total + item.price * item.quantity;
	}, 0);

	const handleClose = () => {
		hideCheckout();
	};

const handleFinish = () => {
	
}

	const handleSubmit = e => {
		e.preventDefault();

		const fd = new FormData(e.target);
		const customerData = Object.fromEntries(fd.entries());
		// console.log(customerData === {email: qwe@qwert, name:...})

		sendRequest(
			JSON.stringify({
				order: {
					items,
					customer: customerData,
				},
			})
		);
	};

	if (data && !error) {
		return (
			<Modal open={progress === 'checkout'} onClose={handleClose}>
				<h2>Success!</h2>
				<p>Your order was submited</p>
				<p className="modal-actions">
					<Button onClick={handleClose}>Ok</Button>
				</p>
			</Modal>
		);
	}

	return (
		<Modal open={progress === 'checkout'} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total Amount: {currenceFormatter.format(cartTotal)}</p>

				<Input label="Full Name" type="text" id="name" />
				<Input label="E-mail Address" type="email" id="email" />
				<Input label="Street" type="text" id="street" />

				<div className="control-row">
					<Input label="Pastal Code" type="text" id="postal-code" />
					<Input label="City" type="text" id="city" />
				</div>
				{error && <Error title="Failed to submit" message={error} />}
				<p className="modal-actions">
					{isSending ? (
						<span>Sending order data...</span>
					) : (
						<>
							{' '}
							<Button textOnly type="button" onClick={handleClose}>
								Close
							</Button>
							<Button>Submit Order</Button>
						</>
					)}{' '}
				</p>
			</form>
		</Modal>
	);
};
