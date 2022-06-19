import { useStateContext } from '../lib/context'

import Link from 'next/link'
import {FiShoppingBag} from 'react-icons/fi'

import Cart from './Cart'
import User from './User'
// Styles
import { NavStyle, NavItems } from '../styles/NavStyle'

// Animations
const {AnimatePresence, motion} = require('framer-motion')

//Auth
import {useUser} from '@auth0/nextjs-auth0'
// To make it work, like the context, we need to wrap up our app with some shinings

export default function Nav(){

    const {showCart, setShowCart, totalQuantities} = useStateContext()
    const {user, error, isLoading} = useUser()
    console.log(user)

    return(
        <NavStyle>
            <Link href={'/'}>
                <h1>
                    JackerShop 
                </h1>
            </Link>
            <NavItems>
                <User />
                <div onClick={()=>setShowCart(true)}>
                    {totalQuantities>0 && <motion.span animate={{scale:1}} initial={{scale:0}}>{totalQuantities}</motion.span>}
                    <FiShoppingBag />
                    <h3>Cart</h3>
                </div>
            </NavItems>
            <AnimatePresence>
                {showCart && <Cart/>}
            </AnimatePresence>
        </NavStyle>
    )
}