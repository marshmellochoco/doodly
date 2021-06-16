const React = require("react");
const CartProvider = require("./src/components/cartProvider").default;

exports.wrapRootElement = ({ element }) => {
    return <CartProvider>{element}</CartProvider>;
};
