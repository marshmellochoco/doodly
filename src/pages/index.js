import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout';
import Card from '../components/card';

// styles
const CardItems = styled.div`
    max-width: 1024px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 1rem;
    row-gap: 4rem;
    margin: 0 auto;
    @media (max-width: 1024px) {
        max-width: 768px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 640px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

// markup
const IndexPage = ({ data }) => {
    const node = data.allStripePrice.nodes;

    return (
        <Layout>
            <CardItems>
                {node.map((n) => {
                    return <Card node={n} key={n.product.id} />;
                })}
            </CardItems>
        </Layout>
    );
};

export default IndexPage;

// query
export const query = graphql`
    query {
        allStripePrice {
            nodes {
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
    }
`;
