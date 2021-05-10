import { createContext } from 'react'
import { useState, useEffect } from 'react'


//context is something that creates a global state

export const ContextCart = createContext();

const Cart = ({ children }) => {
    const getInitialCart = () => JSON.parse(localStorage.getItem("cart"))
    const [cart, setCart] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const initialCart = getInitialCart()
        if (initialCart) {
            setCart(initialCart);
        }
    }, [])

    useEffect(() => {
        //write to local storage
        localStorage.setItem('cart', JSON.stringify(cart))

    }, [cart])

    const openCart = () => {
        setIsOpen(true)
    }
    const closeCart = () => {
        setIsOpen(false)
    }
    const addItemToCart = (product, qty = 1) => {
        const item = cart.find(i => i.id === product.id)

        if (item) {
            item.qty += qty;
            setCart([...cart]); //...card extends what we have in the cart

        } else {
            setCart([...cart, { ...product, qty }]); //...card extends what we have in the cart

        }
    }

    const removeItemFromCart = (id) => {
        const newCart = cart.filter(item => {
            return item.id !== id //remove the object with the filter id, return false if not removed, return true if removed
        })
        setCart(newCart)
    }


    const exposed = {
        cart,
        addItemToCart,
        removeItemFromCart,
        openCart,
        closeCart,
        isOpen,
    }
    return (
        <ContextCart.Provider value={exposed}>
            {children}
        </ContextCart.Provider>
    )
}

export default Cart;

< Cart >
    <p> Hi there</p>
</Cart >