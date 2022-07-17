import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

type Props = {
  id: string;
  thumbnail: string;
  name: string;
  price: string;
  sale?: string;
  rate?: number;
};

const ProductCard = (props: Props) => {
  const { id, thumbnail, name, price } = props;

  return (
    <Link to={`/product/${id}`}>
      <div className="production-card">
        <img src={thumbnail} alt="" width={"100%"} />
        <h1>{name}</h1>
        <p>${price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
