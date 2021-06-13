import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import Card from "../components/card";

// styles
const CardItems = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 1rem;
    row-gap: 4rem;
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 640px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

// markup
const IndexPage = ({ data }) => {
    const node = data.allContentfulDoodle.nodes;

    return (
        <Layout>
            <CardItems>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((elem) => {
                    return <Card node={node[0]} key={elem} />;
                })}
            </CardItems>{" "}
        </Layout>
    );
};

export default IndexPage;

// query
export const query = graphql`
    query {
        allContentfulDoodle {
            nodes {
                slug
                name
                addedDate
                price
                doodle {
                    gatsbyImageData
                }
            }
        }
    }
`;
