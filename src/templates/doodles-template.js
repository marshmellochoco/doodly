import { graphql, Link } from 'gatsby';
import React, { useContext } from 'react';
import styled from '@emotion/styled';

import BackIcon from '../images/arrow-left.svg';
import CartIcon from '../images/cart.svg';
import Layout from '../components/layout';
import { CartDispatchContext } from '../components/cartProvider';

// styles
const DoodleWrapper = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    @media (max-width: 768px) {
        max-width: 375px;
        align-items: center;
        flex-direction: column;
    }
`;

const DoodlePreview = styled.div`
    width: 50%;
    max-width: 28rem;
    border: 2px solid;
    border-image-slice: 1;
    border-width: 2px;
    border-image-source: radial-gradient(
        circle,
        rgba(255, 255, 255, 1) 0%,
        rgba(252, 227, 255, 1) 70%,
        rgba(162, 239, 255, 1) 100%
    );
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const DoodlePreviewImage = styled.img`
    width: 100%;
`;

const DoodleDetail = styled.div`
    margin-left: 2rem;
    width: 50%;
    max-width: 20rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 100%;
        margin: 3rem auto;
    }
`;

const DoodleDetailUpper = styled.div`
    min-height: 250px;
`;

const IconLink = styled((props) => <Link {...props} />)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid grey;
    width: 100%;
    text-align: center;
    color: black;
    text-decoration: none;
    &:hover {
        box-shadow: 2px 6px 6px 4px #f5f3ff;
    }
`;

const Icon = styled.img`
    margin: 0 0.5rem;
`;

const IconText = styled.p`
    margin: 1rem 0.5rem;
`;

const IconButton = styled.button`
    border: 0;
    background-color: #a9ffd4;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    cursor: pointer;
    &:hover {
        box-shadow: 2px 6px 6px 4px #f5f3ff;
    }
`;

// markup
const DoodleTemplate = ({ data, id }) => {
    const dispatch = useContext(CartDispatchContext);

    const addToCart = (priceid, id, image, name, quantity, price) => {
        // TODO: Pop up to show item is added to cart
        dispatch({
            type: 'ADD_ITEM',
            item: { priceid, id, image, name, quantity, price },
        });
        return;
    };

    return (
        <Layout>
            <DoodleWrapper id={id}>
                <DoodlePreview>
                    <DoodlePreviewImage
                        src={data.stripePrice.product.images[0]}
                        alt=''
                    />
                </DoodlePreview>
                <DoodleDetail>
                    <DoodleDetailUpper>
                        <IconLink to='/'>
                            <Icon src={BackIcon} />
                            <IconText>Back</IconText>
                        </IconLink>
                        <h2>{data.stripePrice.product.name}</h2>
                        <p>{data.stripePrice.product.description}</p>
                        <p>
                            RM {(data.stripePrice.unit_amount / 100).toFixed(2)}
                        </p>
                    </DoodleDetailUpper>
                    <IconButton
                        onClick={() =>
                            addToCart(
                                data.stripePrice.id,
                                data.stripePrice.product.id,
                                data.stripePrice.product.images[0],
                                data.stripePrice.product.name,
                                1,
                                data.stripePrice.unit_amount
                            )
                        }
                    >
                        <IconText>Add To Cart</IconText>
                        <Icon src={CartIcon} />
                    </IconButton>
                </DoodleDetail>
            </DoodleWrapper>
        </Layout>
    );
};

export default DoodleTemplate;

// query
export const query = graphql`
    query ($id: String) {
        stripePrice(product: { id: { eq: $id } }) {
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
