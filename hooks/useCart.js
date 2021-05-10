import { useContext } from 'react'
import { ContextCart } from "../context/Cart"

const useCart = () => useContext(ContextCart);

export default useCart
