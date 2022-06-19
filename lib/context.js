import React, {createContext, useContext, useState} from 'react'

//To share quantities with all components we'll create a context to globalize it.
const ShopContext = createContext()

export const StateContext = ({children}) => {
    //Add our state
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [qty, setQty] = useState(1)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

    const increaseQty = ()=>{
        setQty((prevQty)=>prevQty+1)
    }

    const decreaseQty = ()=>{
        setQty((prevQty)=>{

            if(prevQty-1<=1)return 1

            return prevQty-1
        })
    }

    const onAdd = (product, quantity) =>{
        setTotalQuantities(prevTotal => prevTotal+quantity)
        setSubTotal(prevSub=>prevSub+product.price*quantity)
        const exist = cartItems.find(item=>item.slug===product.slug)
        if(exist){
            setCartItems(
                cartItems.map(item => item.slug===product.slug ? {...exist, quantity: exist.quantity+quantity} : item )
            )
        }
        else{
            setCartItems([...cartItems, {...product, quantity:quantity}])
        }
    }

    const onRemove = (product) => {
        setTotalQuantities(prevTotal => prevTotal-1)
        setSubTotal(prevSub=>prevSub-product.price)
        const exist = cartItems.find(item=>item.slug===product.slug)
        if(exist.quantity===1){
            setCartItems(cartItems.filter(item=>item.slug !== product.slug))
        }
        else{
            setCartItems(cartItems.map(item => item.slug===product.slug ? {...exist, quantity: exist.quantity-1} : item ))
        }
    }

    return(
        <ShopContext.Provider value={{qty, setQty, increaseQty, decreaseQty, cartItems, showCart, setShowCart, onAdd, onRemove, totalQuantities, subTotal}}>
            {children}
        </ShopContext.Provider>
    )
}

export const useStateContext = () => useContext(ShopContext)