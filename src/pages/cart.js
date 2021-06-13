import React from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout";

import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Header = styled.h1`
    text-align: center;
`;

const CartTable = styled.table`
    margin: auto;
    padding: 0 1rem;
    width: 100%;
    text-align: center;
`;

const CartCell = styled.td`
    padding: 1rem;
`;

const DoodleLink = styled((props) => <Link {...props} />)`
    display: flex;
    align-items: center;
    text-align: start;
    text-decoration: none;
    color: black;
    &:hover {
        color: grey;
    }
`;

const DoodleImage = styled((props) => <GatsbyImage {...props} />)`
    height: auto;
    width: 5rem;
    margin: 0 1rem;
`;

const RemoveButton = styled.button`
    background-color: white;
    border: 1px solid black;
    cursor: pointer;
    &:hover {
        background-color: grey;
        color: white;
    }
`;

// markup
const Cart = ({ data }) => {
    const removeCart = (slug) => {
        // TODO: Implement remove from cart
        console.log(slug);
        return;
    };

    return (
        // TODO: Implement view cart
        <Layout>
            <Header>Your Cart</Header>
            <CartTable>
                <thead>
                    <tr>
                        <th>Doodle</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>{""}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <CartCell>
                            <DoodleLink to="/">
                                <DoodleImage
                                    image={getImage(
                                        data.contentfulDoodle.doodle
                                    )}
                                    alt=""
                                />
                                Img Doodle
                            </DoodleLink>
                        </CartCell>
                        <CartCell>2</CartCell>
                        <CartCell>$ 200.00</CartCell>
                        <CartCell>
                            <RemoveButton>x</RemoveButton>
                        </CartCell>
                    </tr>
                    <tr>
                        <CartCell>
                            <DoodleLink to="/">
                                <DoodleImage
                                    image={getImage(
                                        data.contentfulDoodle.doodle
                                    )}
                                    alt=""
                                />
                                Img Doodle
                            </DoodleLink>
                        </CartCell>
                        <CartCell>2</CartCell>
                        <CartCell>$ 200.00</CartCell>
                        <CartCell>
                            <RemoveButton onClick={() => removeCart("hello")}>
                                x
                            </RemoveButton>
                        </CartCell>
                    </tr>
                </tbody>
            </CartTable>
        </Layout>
    );
};

export default Cart;

export const query = graphql`
    query ($slug: String) {
        contentfulDoodle(slug: { eq: $slug }) {
            doodle {
                gatsbyImageData
            }
        }
    }
`;
