import { useStateContext } from "../lib/context"

// Styles
import {CartWrapper, CartStyle, Card, CardInfo, EmptyStyle, Quantity, Checkout, Cards} from '../styles/CartStyle'

import {FaShoppingCart} from 'react-icons/fa'
import {AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import getStripe from "../lib/getStripe"


// Animation variants
const card = {
    hidden:{opacity:0, scale:0.8},
    show:{opacity:1, scale:1}
}

const cards={
    hidden:{opacity:1},
    show:{
        opacity:1,
        transition:{
            // === delay for children
            delayChildren:0.45,
            staggerChildren:0.15
        }}
}

export default function Cart () {
    const {cartItems, setShowCart, onAdd, onRemove, subTotal} = useStateContext()

    // Payment
    const handleCheckout = async() =>{
        const stripe = await getStripe()
        const response = await fetch('/api/stripe', {
            method:'POST',
            headers:{'Content-type' : 'application/json'},
            body:JSON.stringify(cartItems)
        })
        const data = await response.json()
        await stripe.redirectToCheckout({sessionId: data.id})
    }

    return(
        <CartWrapper 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        onClick={()=>setShowCart(false)}
        >
            <CartStyle 
            initial={{x:'50%'}}
            animate={{x:'0%'}}
            transition= {{type:'tween'}}
            exit={{x:'50%'}}
            onClick={(e)=>e.stopPropagation()}>
                {cartItems.length<1 && (
                    <EmptyStyle 
                    initial={{opacity:0, scale:0.8}}
                    animate={{opacity:1, scale:1}}
                    transition={{delay:0.2}}
                    >
                        <h2>You have more shopping to do !</h2>
                        <FaShoppingCart/>
                    </EmptyStyle>
                )}
                <Cards variants={cards} initial='hidden' animate='show' layout>
                {cartItems.length >= 1 && 
                    cartItems.map((item)=>{
                        return(
                            <Card 
                            variants={card}
                            layout
                            key={item.slug}>
                                <img 
                                    src={item.image.data.attributes.formats.thumbnail.url} 
                                    alt={item.title} 
                                />
                                <CardInfo>
                                    <h3>{item.title}</h3>
                                    <h3>{item.price} €</h3>
                                    <Quantity>
                                        <span>Quantity</span>
                                        <button onClick={()=>onRemove(item)}><AiFillMinusCircle/></button>
                                        <p>{item.quantity}</p>
                                        <button onClick={()=>onAdd(item, 1)}><AiFillPlusCircle/></button>
                                    </Quantity>
                                </CardInfo>
                            </Card>
                        )
                    })
                }
                </Cards>
                {cartItems.length>=1 && (
                    <Checkout layout>
                        <h3>Subtotal: {subTotal} €</h3>
                        <button onClick={()=>handleCheckout()}>Purchase</button>
                    </Checkout>
                )}
            </CartStyle>
        </CartWrapper>
    )
}