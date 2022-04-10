import styled from '@emotion/styled';
import { Link } from 'gatsby';
import React from 'react';

import icon from '../images/icon.png';
import CartIcon from '../images/cart.svg';

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
    max-width: 1024px;
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
    display: flex;
    width: 96px;
    padding-right: 8px;
`;

const Indicator = styled.div`
    position: absolute;
    font-size: 12px;
    color: white;
    width: 16px;
    height: 16px;
    background: red;
    border-radius: 50%;
    right: -6px;
    bottom: 0;
    display: flex;
    justify-content: center;
`;

const NavLinks = styled((props) => <Link {...props} />)`
    margin-left: auto;
    text-decoration: none;
    color: black;
    position: relative;
    &:hover {
        color: gray;
    }
`;

// markup
const Navbar = ({ props }) => {
    return (
        <Header>
            <Nav>
                <Link to='/'>
                    <NavIcon src={icon} />
                </Link>
                <NavItems>
                    <NavLinks to='/cart' title="Cart">
                        <img src={CartIcon} alt='Cart' />
                        {props.count ? (
                            <Indicator>{props.count}</Indicator>
                        ) : null}
                    </NavLinks>
                </NavItems>
            </Nav>
        </Header>
    );
};

export default Navbar;
