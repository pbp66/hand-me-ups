import react from 'react'

function ProductCard ({ product }) {
    const title = product.title
    const description = product.description
    const price = product.price
    const image = product.img
    return (
        <>
        <div>
            {title}
        </div>
        <div>
            {description}
        </div>
        <div>
            {price}
        </div>
        <div>
            {image}
        </div>
        </>
    )
}

export default ProductCard