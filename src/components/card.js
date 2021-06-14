import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";

// styles
const CardWrapper = styled((props) => <Link {...props} />)`
    width: 18rem;
    margin: auto;
    box-shadow: 2px 4px 4px 0px rgb(245, 243, 255);
    text-decoration: none;
    color: black;
    &:hover {
        box-shadow: 2px 6px 6px 4px rgb(245, 243, 255);
    }
`;

const CardImage = styled.img`
    border-bottom: 1px solid rgb(245, 243, 255);
    height: 18rem;
    background-color: white;
`;

const CardDetail = styled.div`
    position: relative;
    height: 12rem;
    padding: 1rem 1rem 0 1rem;
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    margin: 0;
`;

const CardSub = styled.p`
    padding-top: 1rem;
    line-height: 1.75rem;
`;

const CardFooter = styled.p`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 1rem;
`;

// markup
const Card = ({ node }) => {
    return (
        <CardWrapper to={"/doodle/" + node.product.id}>
            <CardImage src={node.product.images} alt={node.product.name} />
            <CardDetail>
                <CardTitle>{node.product.name}</CardTitle>
                <CardSub>{node.product.description}</CardSub>
                <CardFooter>RM {node.unit_amount / 100}</CardFooter>
            </CardDetail>
        </CardWrapper>
    );
};

export default Card;
