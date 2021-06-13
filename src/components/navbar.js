import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";

import icon from "../images/icon.png";
import CartIcon from "../images/cart.svg";

// styles
const Header = styled.header`
    position: absolute;
    top: 0;
    position: sticky;
    z-index: 20;
    border-bottom: 1px solid rgb(245, 243, 255);
    background-color: white;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 72rem;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
`;

const NavIcon = styled.img`
    height: 3rem;
`;

const NavItems = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 96px);
`;

const NavLinks = styled((props) => <Link {...props} />)`
    margin-left: auto;
    text-decoration: none;
    color: black;
    &:hover {
        color: gray;
    }
`;

// markup
const Navbar = () => {
    return (
        <Header>
            <Nav>
                <Link to="/">
                    <NavIcon src={icon} />
                </Link>
                <NavItems>
                    <NavLinks to="/cart">
                        <img src={CartIcon} alt="Cart" />
                    </NavLinks>
                </NavItems>
            </Nav>
        </Header>
    );
};

export default Navbar;
