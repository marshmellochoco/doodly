import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/layout';

import { graphql, Link } from 'gatsby';
import {
    CartDispatchContext,
    CartStateContext,
} from '../components/cartProvider';

const Header = styled.h1`
    text-align: center;
`;

const CartTable = styled.table`
    margin: auto;
    padding: 0 1rem;
    width: 100%;
    text-align: center;
    & thead {
        height: 3rem;
    }
    & tbody tr:nth-of-type(odd) {
        background: #f5f3ff;
    }
`;

const CartCell = styled.td`
    padding: 1rem 0;
`;

const DoodleLink = styled((props) => <Link {...props} />)`
    display: flex;
    align-items: center;
    text-align: start;
    text-decoration: none;
    color: black;
    margin-right: auto;
    width: max-content;
    &:hover {
        color: grey;
    }
`;

const DoodleImage = styled.img`
    height: 4rem;
    width: auto;
    margin: 0 1rem;
`;

const RemoveButton = styled.button`
    border: 0;
    background: transparent;
    font-size: 16px;
    color: black;
    cursor: pointer;
    &:hover {
        color: grey;
    }
`;

const CheckoutContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const CheckoutButton = styled.button`
    border: 0;
    background-color: #a9ffd4;
    color: black;
    min-width: 50%;
    text-align: center;
    cursor: pointer;
    padding: 1rem;
    &:hover {
        box-shadow: 2px 6px 6px 4px #f5f3ff;
    }
`;

const EmptyCart = styled.p`
    text-align: center;
`;

// markup
const Cart = () => {
    const [loading, setLoading] = useState(false);
    const context = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);

    const removeCart = (id) => {
        // TODO: Popup that tell user the item is removed
        dispatch({ type: 'REMOVE_ITEM', id });
        return;
    };

    const getStripe = () => {
        let stripePromise;
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
            mode: 'payment',
            lineItems: context.cart.map((item) => {
                return { price: item.priceid, quantity: item.quantity };
            }),
            successUrl: `${process.env.URL}/success/`,
            cancelUrl: `${process.env.URL}/cart/`,
        });
        if (error) {
            console.warn('Error:', error);
            setLoading(false);
        }
    };

    // TODO: Change buy quantity
    return (
        <Layout>
            <Header>Your Cart</Header>
            {context && context.cart.length > 0 ? (
                <>
                    <CartTable cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Doodle</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>{''}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.cart.map((m) => {
                                return (
                                    <tr key={m.id}>
                                        <CartCell>
                                            <DoodleLink to={`/doodle/${m.id}`}>
                                                <DoodleImage
                                                    src={m.image}
                                                    alt=''
                                                />
                                                {m.name}
                                            </DoodleLink>
                                        </CartCell>
                                        <CartCell>{m.quantity}</CartCell>
                                        <CartCell>
                                            RM {(m.price / 100).toFixed(2)}
                                        </CartCell>
                                        <CartCell>
                                            <RemoveButton
                                                onClick={() => removeCart(m.id)}
                                                title='Remove'
                                            >
                                                x
                                            </RemoveButton>
                                        </CartCell>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </CartTable>
                    <CheckoutContainer>
                        <CheckoutButton
                            disabled={loading}
                            onClick={redirectToCheckout}
                        >
                            Checkout
                        </CheckoutButton>
                    </CheckoutContainer>
                </>
            ) : (
                <EmptyCart>
                    You do not have any doodles in your cart yet.<br></br>
                    <Link to={'/'}> Get some here! </Link>
                </EmptyCart>
            )}
        </Layout>
    );
};

export default Cart;

export const query = graphql`
    query {
        stripePrice(product: { id: { eq: "prod_Jfdo3lqy0qI5Kd" } }) {
            id
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
