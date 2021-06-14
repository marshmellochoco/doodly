import React, { useState } from "react";
import styled from "@emotion/styled";
import { loadStripe } from "@stripe/stripe-js";
import Layout from "../components/layout";

import { graphql, Link } from "gatsby";

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

const DoodleImage = styled.img`
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

const CheckoutContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const CheckoutButton = styled.button`
    background-color: mintcream;
    color: black;
    border: 1px solid gainsboro;
    min-width: 50%;
    text-align: center;
    cursor: pointer;
    padding: 1rem;
    &:hover {
        background-color: #d2d3dd;
    }
`;

// markup
const Cart = ({ data }) => {
    const [loading, setLoading] = useState(false);

    const removeCart = (slug) => {
        // TODO: Implement remove from cart
        return;
    };

    let stripePromise;
    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
        }
        return stripePromise;
    };

    const redirectToCheckout = async (event) => {
        event.preventDefault();
        setLoading(true);
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: [
                { price: "price_1J2IBbEY376eQXxtwXv6hMzX", quantity: 1 },
            ],
            successUrl: `http://localhost:8000/page-2/`,
            cancelUrl: `http://localhost:8000/`,
        });
        if (error) {
            console.warn("Error:", error);
            setLoading(false);
        }
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
                            <DoodleLink
                                to={`/doodle/${data.stripePrice.product.id}`}
                            >
                                <DoodleImage
                                    src={data.stripePrice.product.images[0]}
                                    alt=""
                                />
                                {data.stripePrice.product.name}
                            </DoodleLink>
                        </CartCell>
                        <CartCell>2</CartCell>
                        <CartCell>RM {data.stripePrice.unit_amount}</CartCell>
                        <CartCell>
                            <RemoveButton>x</RemoveButton>
                        </CartCell>
                    </tr>
                    <tr>
                        <CartCell>
                            <DoodleLink to="/">
                                <DoodleImage
                                    src={data.stripePrice.product.images[0]}
                                    alt=""
                                />
                                {data.stripePrice.product.name}
                            </DoodleLink>
                        </CartCell>
                        <CartCell>2</CartCell>
                        <CartCell>RM {data.stripePrice.unit_amount}</CartCell>
                        <CartCell>
                            <RemoveButton>x</RemoveButton>
                        </CartCell>
                    </tr>{" "}
                </tbody>
            </CartTable>
            <CheckoutContainer>
                <CheckoutButton disabled={loading} onClick={redirectToCheckout}>
                    Checkout
                </CheckoutButton>
            </CheckoutContainer>
        </Layout>
    );
};

export default Cart;

export const query = graphql`
    query {
        stripePrice(product: { id: { eq: "prod_Jfdo3lqy0qI5Kd" } }) {
            unit_amount
            product {
                id
                name
                description
                images
                active
            }
        }
    }
`;
