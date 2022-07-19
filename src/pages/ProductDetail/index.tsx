import { Col, Radio, Row } from "antd";
import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalLogin from "src/components/ModalLogin";
import ProductCard from "src/components/ProductCard";
import QuantityButton from "src/components/QuantityButton";
import useRouting from "src/hooks/UseRouting";
import "./ProductDetail.scss";
import productAPI, { Product } from "src/api/products";
type Props = {};
export interface newProduct {
  id: string;
  name: string;
  categoryId: string;
  supplierId: string;
  image: Array<string>;
  price: string;
  sale: string;
  dimension: string;
  warranty: string;
  color: Array<string>;
  sold: number;
  rate?: number;
  newPrice?: string;
  description: string;
}
const ProductDetail = (props: Props) => {
  const user = useSelector((state: any) => state.auth.user);
  const params = useParams();
  const [amount, setAmount] = React.useState(1);
  const [isModalLogin, setIsModalLogin] = React.useState(false);
  const [product, setProduct] = React.useState<newProduct | null>(null);
  const [relatedProduct, setRelatedProduct] =
    React.useState<Array<Product> | null>([]);
  const navigate = useNavigate();
  const { generate } = useRouting();
  async function getData(id?: string) {
    const res = await productAPI.getDetailProduct(id);
    setProduct({
      ...res.data,
      newPrice: (
        parseFloat(res.data.price) * parseFloat(res.data.sale)
      ).toFixed(2),
    });
    setRelatedProduct(res.data.relatedProducts);
  }
  useEffect(() => {
    getData(params.id);
  }, [params]);

  const handleAddToCard = () => {
    if (user) {
    } else {
      setIsModalLogin(true);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params]);

  return (
    <div className="product-detail">
      <Row gutter={[30, 30]}>
        <Col md={8} xs={24}>
          <div className="product-detail-image">
            <img
              src={
                product?.image[0] ??
                "https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp"
              }
              alt="product"
              width={"100%"}
            />
          </div>
        </Col>
        <Col md={16} xs={24}>
          <div className="product-detail-info">
            <h1>{product?.name}</h1>
            <div className="product-detail-info-price">
              <span className="product-detail-info-price-sale">
                ${product?.newPrice}
              </span>
              <span className="product-detail-info-price-origin">
                ${product?.price}
              </span>
            </div>
            <div className="product-detail-info-rate-count">
              <FaHeart color="red" />
              <FaHeart color="red" />
              <FaHeart color="red" />
              <FaHeart color="red" />
              <FaHeart color="red" />
              <span>(20)</span>
            </div>
            <div className="product-detail-info-description">
              <h3>Description</h3>
              <p>{product?.description}</p>
            </div>
            <div className="product-detail-info-color">
              <h3>Color:</h3>
              <Radio.Group className="radio-custom">
                {product?.color.map((item, index) => {
                  return (
                    <Radio value={item} key={index}>
                      {item}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
            <div className="product-detail-info-quantity">
              <h3>Amount:</h3>
              <QuantityButton value={amount} onChange={setAmount} />
            </div>
            <div className="product-detail-info-button">
              <button className="btn" onClick={handleAddToCard}>
                Add to cart
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="similar">
        <h1>You might also like</h1>
        <Row gutter={[30, 30]}>
          {relatedProduct?.map((item, index) => (
            <Col key={index} md={6} xs={12}>
              <ProductCard
                id={item.id}
                thumbnail={
                  item.image[0] ??
                  "https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp"
                }
                name={item.name}
                price={item.price}
                sale={item.sale}
                rate={item.rate}
              />
            </Col>
          ))}
        </Row>

        <div className="btn-view-more">
          <button
            className="btn"
            onClick={() => navigate(generate("category"))}
          >
            View more
          </button>
        </div>
      </div>
      <ModalLogin
        visible={isModalLogin}
        onCancel={() => setIsModalLogin(false)}
      />
    </div>
  );
};

export default ProductDetail;
