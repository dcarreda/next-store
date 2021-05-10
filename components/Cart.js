import styled from "styled-components"
import { AiOutlineClose } from "react-icons/ai"
import useCart from "../hooks/useCart"

const Container = styled.div`
    position: fixed;
    top:0;
    bottom:0;
    right:0;
    heigth:100vh;
    background:white;
    width: 300px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in;
`
const X = styled(AiOutlineClose)`
    font-size:3rem;

    &:hover{
        cursor:pointer;
    }
`

const XContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ContentContainer = styled.div`
    padding: 1rem 2rem;
`
const Title = styled.h2`
    font-size:3rem;
    font-weight:400;
    border-bottom: 1px solid #EFEFEF
`

const Item = styled.li`
    list-style:none;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EFEFEF

`
const Total = styled.p`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #EFEFEF
    font-size:2rem;
`
const ItemList = styled.ul`
    padding-left:0;
`

const Button = styled.button`
    color: white;
    background: -webkit-linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #29ffc6, #20e3b2, #0cebeb); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    outline: none;
    border: none;
    font-size: 2rem;
    width: 100%;
    padding: 1.5rem;
    transition: 0.5s;

    &:hover{
        transform: scale(1.1);
    }

`

function Cart() {
    const { cart, isOpen, openCart, closeCart } = useCart();

    const handleCloseCart = () => {
        closeCart();
    }
    var total = 0;
    return (
        <Container isOpen={isOpen}>
            <XContainer>
                <X onClick={handleCloseCart} />
            </XContainer>
            <ContentContainer>
                <Title>Cart</Title>
                <ItemList>
                    {cart.map(i => {
                        total = i.price * i.qty;

                        return (

                            <Item>
                                <span>{i.qty}x{i.name}</span>
                                <span>{i.price}€</span>

                            </Item>
                        )
                    })}
                </ItemList>
                <Total>
                    <span>Total</span>
                    <span>{total}</span>
                </Total>
                <Button>Checkout</Button>

            </ContentContainer>
        </Container>
    )
}

export default Cart
