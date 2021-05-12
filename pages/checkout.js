import Page from "../components/styled/Page"
import useCart from "../hooks/useCart"
import styled from "styled-components"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"

const ItemList = styled.ul`
    padding-left: 0;
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
function checkout() {
    const { cart, total } = useCart();


    const processPayment = async () => {
        const url = "/.netlify/functions/charge-cart";
        const newCart = cart.map(({ id, qty }) => ({
            id,
            qty,
        }))
        console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
        const { data } = await axios.post(url, { newCart });
        await stripe.redirectToCheckout({ sessionId: data.id })

    }


    return (
        <Page>
            <h2>Checkout</h2>

            {cart.length > 0 ? (
                <>
                    <ItemList>
                        {cart.map(i => {

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
                    <Button onClick={processPayment}>Buy</Button>
                </>
            ) : (
                    <p>You dont have any items in your card</p>
                )}
        </Page>
    )
}

export default checkout
