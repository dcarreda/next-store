import Link from 'next/link'
import styled from "styled-components"
import UnstyledLink from './styled/UnstyledLink'

const Nav = styled.nav`
    background: white;
    padding: 2rem;
    
`


const NavContainer = styled.div`
    width:100%;
    max-width:768px;
    margin: 0 auto;
    font-size: 2rem;
`
function Navbar() {
    return (
        <div>
            <Nav>
                <NavContainer>

                    <Link href="/">
                        <UnstyledLink>Home</UnstyledLink>
                    </Link>
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
