import { createContext, useReducer, useState } from 'react';

export const CartContext = createContext({
	items: [],
	addItem: item => {},
	removeItem: id => {},
	clearCart:()=>{}
});

const cartReducer = (state, action) => {
	if (action.type === 'ADD_ITEM') {
		const existingCartItemIdx = state.items.findIndex(item => item.id === action.item.id);
		const updatedItems = [...state.items];
		if (existingCartItemIdx > -1) {
			const existingItem = state.items[existingCartItemIdx];
			const updatedItem = {
				...existingItem,
				quantity: existingItem.quantity + 1,
			};
			updatedItems[existingCartItemIdx] = updatedItem;
		} else {
			updatedItems.push({ ...action.item, quantity: 1 });
		}
		return { ...state, items: updatedItems };
	}
	if (action.type === 'REMOVE_ITEM') {
		const existingCartItemIdx = state.items.findIndex(item => item.id === action.id);
		const existingCartItem = state.items[existingCartItemIdx];
		const updatedItems = [...state.items];

		if (existingCartItem.quantity === 1) {
			updatedItems.splice(existingCartItemIdx, 1);
		} else {
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1,
			};
			updatedItems[existingCartItemIdx] = updatedItem;
		}
		return { ...state, items: updatedItems };
	}
	if(action.type === 'CLEAR_CART') {
		return {...state, items:[]}
	}

	return state;
};

export const CartContextProvider = ({ children }) => {
	const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

	function addItem(item) {
		dispatchCartAction({ type: 'ADD_ITEM', item: item });
	}
	function removeItem(id) {
		dispatchCartAction({ type: 'REMOVE_ITEM', id });
	}
	function clearCart() {
		dispatchCartAction({ type: 'CLEAR_CART' });
	}

	const cartContext = {
		items: cart.items,
		addItem,
		removeItem,
		clearCart,
	};

	return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};
