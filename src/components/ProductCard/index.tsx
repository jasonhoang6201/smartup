import React from "react";
import { FaHeart } from "react-icons/fa";
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
  const { id, thumbnail, name, price, sale, rate } = props;
  const salePrice = sale
    ? (
        parseFloat(price) -
        (parseFloat(price) * parseFloat(sale)) / 100
      ).toFixed(2)
    : price;

  console.log(rate);

  //array with 10 element
  const rateArray = Array.from(Array(10).keys());

  return (
    <Link to={`/product/${id}`}>
      <div className="production-card">
        <img src={thumbnail} alt="" width={"100%"} />
        <h1>{name}</h1>
        <div className="price-rate">
          <p>${salePrice || price}</p>
          {rate && (
            <div>
              {Array.from(Array(rate)).map((item, index) => (
                <FaHeart key={index} color="red" />
              ))}
              {Array.from(Array(5 - rate)).map((item, index) => (
                <FaHeart key={index} color="grey" />
              ))}
            </div>
          )}
        </div>

        {sale && sale !== "0" && <p className="sale-price">Off {sale}%</p>}
      </div>
    </Link>
  );
};

export default ProductCard;
