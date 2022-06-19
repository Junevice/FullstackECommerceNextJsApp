//Get BDD Infos
import {useQuery} from 'urql'
import {GET_PRODUCT_QUERY} from '../../lib/query.js'
// Router
import {useRouter} from 'next/router'
// Toast
import {toast} from 'react-hot-toast'
// Styles
import { DetailStyle, ProductInfo, Quantity, Buy } from '../../styles/ProductDetails.js'
// Icons
import {AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
// Context
import { useStateContext } from '../../lib/context.js'
// UseEffect
import { useEffect } from 'react'



export default function ProductDetails() {
 
    // Use our state (take care to use context at first in the code)
    const {qty, setQty, increaseQty, decreaseQty, onAdd} = useStateContext()
    useEffect(()=>{
        setQty(1)
    },[])
    // Fetch slug
    // const router = useRouter()
    // console.log(router)
    const {query} = useRouter()

    // Fetch results from strapi
    const [results] = useQuery({
        query:GET_PRODUCT_QUERY, 
        variables:{slug:query.slug}
    })
    const {data, fetching, error} = results

    if(fetching)return<p>...loading</p>
    if(error)return<p>Oh nooo...{error.message}</p>

    const {title, description, slug, price, image} = data.products.data[0].attributes

    //Create a toast
    const notify = () => {
        toast.success(`${title} added to your cart`, {duration:1500})
    }      
   

    return(
        <DetailStyle>
            <img src={image.data.attributes.formats.medium.url} alt={title} />
            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>
                <Quantity>
                    <span>Quantity</span>
                    <button onClick={decreaseQty}><AiFillMinusCircle/></button>
                    <p>{qty}</p>
                    <button onClick={increaseQty}><AiFillPlusCircle/></button>
                </Quantity>
                <Buy onClick={()=>{
                    onAdd(data.products.data[0].attributes, qty)
                    setQty(1)
                    notify()
                }}>Add to cart</Buy>
            </ProductInfo>
            
        </DetailStyle>
    )
}