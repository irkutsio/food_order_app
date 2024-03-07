import { createContext, useState } from 'react';

export const UserProgressContext = createContext({
	progress: '',
	showCart: () => {},
	hodeCart: () => {},
	showCheckout: () => {},
	hideCheckout: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
	const [userProgress, setUserProgress] = useState('')
    
const showCart = () => {
    setUserProgress('cart')
}
const hideCart = () => {
    setUserProgress('')
}

const showCheckout = () => {
    setUserProgress('checkout')
}

const hideCheckout = () => {
    setUserProgress('')
}

const userProgressCtx = {
    progress:userProgress,
    showCart,
    showCheckout,
    hideCart,
    hideCheckout
}

    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>;
};
