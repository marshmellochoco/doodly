import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const WorkDetails = ({ data }) => {
    const { slug, name, addedDate, price, doodle } = data.contentfulDoodle;

    return (
        <Layout>
            <div id={slug}>
                <h2>{name}</h2>
                <p>{addedDate}</p>
                <p>{price}</p>
                <GatsbyImage image={getImage(doodle)} />
            </div>
        </Layout>
    );
};

export default WorkDetails;

export const query = graphql`
    query ($slug: String) {
        contentfulDoodle(slug: { eq: $slug }) {
            slug
            name
            addedDate
            price
            doodle {
                gatsbyImageData
            }
        }
    }
`;
