import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Navbar from './navbar';
import Seo from './seo';
import CartProvider, { CartStateContext } from './cartProvider';

// styles
const Content = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 3rem 0;
`;

// markup
const Layout = ({ children }) => {
    const cartContext = useContext(CartStateContext);

    return (
        <CartProvider>
            <main>
                <title>Home Page</title>
                <Seo />
                <Navbar
                    props={{
                        count: cartContext ? cartContext.cart.length : 0,
                    }}
                />
                <Content>{children}</Content>
            </main>
        </CartProvider>
    );
};

export default Layout;
