import styled from "styled-components"
import { Normalize } from "styled-normalize"
import Navbar from "../components/Navbar"
import CartProvider from "../context/Cart"
import Cart from "../components/Cart"

const Container = styled.div`
    background: #0cebeb;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    font-family: 'Roboto', sans-serif;
    color: #444;
    min-height: 100vh;
`

const Page = styled.div`
    width:100%;
    max-width:768px;
    margin: 0 auto;
`

const MyApp = ({ Component, pageProps }) => {
    return (
        <CartProvider>
            <Container>
                <Normalize />
                <Navbar />
                <Page>
                    <Component {...pageProps} />
                    <footer>Footer</footer>
                </Page>
            </Container>
            <Cart />
        </CartProvider>

    );
};

export default MyApp