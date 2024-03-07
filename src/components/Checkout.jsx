import { useContext } from 'react';
import { Modal } from './UI/Modal';
import { CartContext } from '../store/CartContext';
import { currenceFormatter } from '../util/formatting';
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import { UserProgressContext } from '../store/UserProgressContext';

export const Checkout = () => {
	const { items } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);


	const cartTotal = items.reduce((total, item) => {
		return total + item.price * item.quantity;
	}, 0);

const handleClose = () => {
hideCheckout()
}


	return (
		<Modal open={progress === 'checkout'} onClose={handleClose}>
			<form>
				<h2>Checkout</h2>
				<p>Total Amount: {currenceFormatter.format(cartTotal)}</p>

				<Input label="Full Name" type="text" id="full-name" />
				<Input label="E-mail Address" type="email" id="email" />
				<Input label="Street" type="text" id="street" />
			
            <div className='control-row'>
            <Input label="Pastal Code" type="text" id="postal-code" />
            <Input label="City" type="text" id="city" />

            </div>
            <p className='modal-actions'>
                <Button textOnly type='button' onClick={handleClose}>Close</Button>
                <Button >Submit Order</Button>

            </p>
            </form>
		</Modal>
	);
};
