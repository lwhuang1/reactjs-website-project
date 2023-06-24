import React, { useContext } from 'react';
import { products as productsArray } from "../data/products";
import { Carousel } from "primereact/carousel"
import { Button } from "primereact/button"
import { Card } from "primereact/card" 
import { CartContext } from "./CartContext"

const ProductTemplate = (product) => {
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(product.id)
    const altProductQuantity = cart.getProductQuantity(product.opposite_id)

    const switchPlan = () => {
        cart.addOneToCart(product.id)
        cart.removeOneFromCart(product.opposite_id)
    }

    const header = (
        <img alt="Card" src={process.env.PUBLIC_URL + product.productImageURL}//src="https://primefaces.org/cdn/primereact/images/usercard.png"
         />
    );

    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
        {
            (altProductQuantity === 1 && productQuantity === 0) 
            ? (<Button label="Switch Plan" icon="pi pi-shopping-cart" severity="help" rounded outlined onClick={() => switchPlan()} />)
            : (
                (productQuantity === 0 && altProductQuantity === 0) 
                ? (<Button label="Add to Cart" icon="pi pi-shopping-cart" severity="info" rounded outlined onClick={() => cart.addOneToCart(product.id)} />)
                : (<Button label="Remove from Cart" icon="pi pi-shopping-cart" severity="danger" rounded outlined onClick={() => cart.removeOneFromCart(product.id)} />)
            )
        }
        </div>
    )

    // console.log(cart.items)
    // console.log('the alt quantity', altProductQuantity, 'the cur quantity', productQuantity, product.id)

    return (
        <Card title={product.title} subTitle={`$${product.price.toString()} / ${product.subscriptionType}`} header={header}
            footer={footer}
            style={{ justifyContent: "center", 
                       marginTop: "10px", marginBottom: "10px",
                       marginLeft: "5px", marginRight: "5px" }}>
            <div>
                <div style={{ height: "10vh" }}>
                    <h4 className="mb-1" style={{ marginBottom: "5px" }}>About the Plan:</h4>
                    <div>
                        {product.description.split(',').map((item) => (
                            <div>
                                {item.trim()}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card> 
    )
}

const Products = () => {
    // const [products, setProducts] = useState(productsArray)

    return (
        <div>
            <Carousel value={productsArray} numVisible={2} numScroll={2} itemTemplate={ProductTemplate}/>
        </div>
    )
}

export default Products