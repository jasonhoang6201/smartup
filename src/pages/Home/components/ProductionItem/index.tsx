import React from 'react'
import { Link } from 'react-router-dom'
import './ProductionItem.scss'

type Props = {
    id: string,
    thumbnail: string,
    name: string,
    price: number,
    sale: number,
    rate: number,
}

const ProductionItem = (props: Props) => {
    const {
        id,
        thumbnail,
        name,
        price,
        sale,
        rate } = props

    return (
        <Link to={`/product/${id}`}>
            <div className="production-card">
                <img src={thumbnail} alt="" width={'100%'} />
                <h1>{name}</h1>
                <p>{price}</p>
            </div>
        </Link>
    )
}

export default ProductionItem