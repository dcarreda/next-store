import Page from "../components/styled/Page"
import useCart from "../hooks/useCart"
import { useEffect } from 'react'

function Success() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();

    }, [])
    return (
        <Page>
            <h1>Payment successful</h1>
            <p>Thank you for your page</p>

        </Page>
    )
}

export default Success
