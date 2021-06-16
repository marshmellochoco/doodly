import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/layout";

// styles
const HomeLink = styled((props) => <Link {...props} />)`
    color: black;
    text-decoration: none;
    &:hover {
        color: grey;
    }
`;

// markup
const Success = () => {
    return (
        <Layout>
            <h2>Thanks for your order, you will get your doodle soon!</h2>
            <HomeLink to="/">Browse more doodles</HomeLink>
        </Layout>
    );
};

export default Success;
