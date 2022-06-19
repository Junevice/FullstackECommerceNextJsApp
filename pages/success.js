import {useRouter} from 'next/router'
import { Wrapper, Card, Address, OrderInfo, InfoWrapper } from '../styles/SuccessStyle'

const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)

import formatMoney from '../lib/formatMoney'

export async function getServerSideProps(params){
    const order = await stripe.checkout.sessions.retrieve(
        params.query.session_id,
        // It doesn't retrieve the images by default so we need:
        {
            expand: ['line_items'],
        }
    )
    return {props: {order}}
}

export default function Success({order}){
    const route = useRouter()
    console.log(order)
    return(
        <Wrapper>
            <Card
            initial={{opacity:0, scale:0.7}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.4}}
            >
                <h1>Thank you for your order !</h1>
                <h2>A confirmation email has been send to</h2>
                <h2>{order.customer_details.email}</h2>
                <InfoWrapper>
                    <Address>
                        <h3>Adress</h3>
                        {Object.entries(order.customer_details.address).map(
                            ([key, value])=>(
                                <p key={key}>
                                    {key}:{value}
                                </p>
                            )
                        )}
                    </Address>
                    <OrderInfo>
                        <h3>Products</h3>
                        {order.line_items.data.map(item=>(
                            <div key={item.id}>
                                <p>Product : {item.description}</p>
                                <p>Quantity : {item.quantity}</p>
                                <p>Price : {formatMoney(item.price.unit_amount)}</p>
                            </div>
                        ))}
                    </OrderInfo>
                </InfoWrapper>
                <button onClick={()=>{route.push('/')}}>Continue Shopping</button>
            </Card>
        </Wrapper>
    )
}