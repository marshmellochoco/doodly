import React, { useState } from "react";
import styled from "@emotion/styled";
import Navbar from "./navbar";
import Seo from "./seo";
import CartProvider from "./cartProvider";

// styles
const Content = styled.div`
    max-width: 72rem;
    margin: 0 auto;
    padding: 3rem 0;
`;

// markup
const Layout = ({ children }) => {
    const [cart, setCart] = useState([]);
    return (
        <CartProvider>
            <main>
                <title>Home Page</title>
                <Seo />
                <Navbar />
                <Content cart={cart} setCart={setCart}>
                    {children}
                </Content>
            </main>
        </CartProvider>
    );
};

export default Layout;
