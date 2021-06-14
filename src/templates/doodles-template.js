import { graphql, Link } from "gatsby";
import React from "react";
import styled from "@emotion/styled";

import BackIcon from "../images/arrow-left.svg";
import CartIcon from "../images/cart.svg";
import Layout from "../components/layout";

// styles
const DoodleWrapper = styled.div`
    max-width: 72rem;
    width: 91.66667%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    @media (max-width: 768px) {
        align-items: center;
        flex-direction: column;
    }
`;

const DoodlePreview = styled.div`
    width: 50%;
    max-width: 28rem;
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
    justify-content: space-around;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 100%;
        margin: 3rem auto;
    }
`;

const IconLink = styled((props) => <Link {...props} />)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid gainsboro;
    width: 100%;
    text-align: center;
    color: black;
    text-decoration: none;
    &:hover {
        background-color: #d2d3dd;
    }
`;

const Icon = styled.img`
    margin: 0 0.5rem;
`;

const IconText = styled.p`
    margin: 1rem 0.5rem;
`;

const IconButton = styled.button`
    background-color: mintcream;
    color: black;
    border: 1px solid gainsboro;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: #d2d3dd;
    }
`;

// markup
const DoodleTemplate = ({ data, id }) => {
    const addToCart = (slug) => {
        // TODO: Implement add to cart
        return;
    };

    return (
        <Layout>
            <DoodleWrapper id={id}>
                <DoodlePreview>
                    <DoodlePreviewImage
                        src={data.stripePrice.product.images[0]}
                        alt=""
                    />
                </DoodlePreview>
                <DoodleDetail>
                    <div>
                        <IconLink to="/">
                            <Icon src={BackIcon} />
                            <IconText>Back</IconText>
                        </IconLink>
                        <h2>{data.stripePrice.product.name}</h2>
                        <p>{data.stripePrice.product.description}</p>
                        <p>RM {data.stripePrice.unit_amount / 100}</p>
                    </div>
                    <IconButton onClick={() => addToCart(id, 1)}>
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
