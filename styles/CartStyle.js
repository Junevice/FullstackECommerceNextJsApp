import styled from 'styled-components'
// Animations (weird way in next otherwise it'll error out)
const {motion} = require('framer-motion')  

export const CartWrapper = styled(motion.div)`
    position:fixed;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    background: rgba(0,0,0,0.4);
    z-index:15;
    display: flex;
    justify-content: flex-end;
`

export const CartStyle = styled(motion.div)`
    width:40%;
    background: #f1f1f1;
    padding: 2rem 5rem;
    overflow-y: scroll;
    position: relative;
    
    ::-webkit-scrollbar {
    display: none;
    }
`


export const Card = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    overflow: hidden;
    background: white;
    padding:2rem;
    margin: 2rem 0rem;
    img{
        width: 8rem;
    }
`

export const CardInfo = styled(motion.div)`
    width:50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const EmptyStyle = styled(motion.div)`
    position:absolute;
    top:0;
    transform: translate(-50%, -0%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 80%;
    h2{
        font-size: 1.4rem;
        padding: 2rem;
    }
    svg{
        font-size: 4rem;
        color:var(--secondary)
    }
`

export const Quantity = styled(motion.div)`
    display:flex;
    align-items: center;
    margin: 1rem 0rem;
    button{
        background: transparent;
        border:none;
        display:flex;
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
    }
    p{
        width: 1rem;
        text-align: center;
    }
    span{
        color: var(--secondary);
    }
    svg{
        color:#494949
    }
`

export const Checkout = styled(motion.div)`
    button{
        background: var(--primary);
        padding:1rem 2rem;
        width:100%;
        color:white;
        margin-top:2rem;
        cursor: pointer;
        border: none;
    }
`

export const Cards = styled(motion.div)`

`