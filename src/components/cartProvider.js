import React from "react";

export const CartStateContext = React.createContext();
export const CartDispatchContext = React.createContext();

const initState = {
    cart: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                cart: action.cart,
            };
        case "ADD_ITEM":
            let found;
            state.cart.forEach((item) => {
                if (item.id === action.item.id) found = true;
            });
            return found
                ? state
                : {
                      ...state,
                      cart: [...state.cart, action.item],
                  };
        case "REMOVE_ITEM":
            let cart = state.cart;
            state.cart.forEach((item) => {
                if (item.id === action.id) {
                    cart.splice(cart.indexOf(item.id), 1);
                }
            });
            return {
                ...state,
                cart: [...cart],
            };

        default:
            return state;
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initState);
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};

export default CartProvider;
