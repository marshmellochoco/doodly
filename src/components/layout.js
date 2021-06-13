import React from "react";
import styled from "@emotion/styled";
import Navbar from "./navbar";

// styles
const Content = styled.div`
    max-width: 72rem;
    margin: 0 auto;
    padding: 3rem 0;
`;

// markup
const Layout = ({ children }) => {
    return (
        <main>
            <title>Home Page</title>
            <Navbar />
            <Content>{children}</Content>
        </main>
    );
};

export default Layout;
