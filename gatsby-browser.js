import "./src/styles/global.css";

import React from "react";
import CartProvider from "./src/components/cartProvider";

export const wrapRootElement = ({ element }) => {
    return <CartProvider>{element}</CartProvider>;
};
