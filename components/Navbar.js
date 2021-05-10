import Link from 'next/link'
import styled from "styled-components"
import UnstyledLink from './styled/UnstyledLink'
import { FiShoppingCart } from 'react-icons/fi';
import useCart from "../hooks/useCart"

const Nav = styled.nav`
    background: white;
    padding: 2rem;
    
`


const NavContainer = styled.div`
    width:100%;
    max-width:768px;
    margin: 0 auto;
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
`

const ShoppingCart = styled(FiShoppingCart)`
    margin-right: 1rem;

    &:hover{
        cursor: pointer;
    }

`


function Navbar() {
    const { openCart } = useCart();
    const handleCart = () => {
        openCart();
    }
    return (
        <div>
            <Nav>
                <NavContainer>

                    <Link href="/">
                        <UnstyledLink>Home</UnstyledLink>

                    </Link>
                    <ShoppingCart onClick={handleCart} />
                </NavContainer>

            </Nav>
        </div>
    )
}

export default Navbar

// const Navbar = () => {
//     return (
//         <Link href="/">
//             <a >Home</a>
//         </Link>

//     );
// };

// export default Navbar;
