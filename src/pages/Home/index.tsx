import hero from "src/assets/images/hero.png";
import { Link } from "react-router-dom";
import PromotionItem from "./components/PromotionItem";
import "./Home.scss";
import ProductCard from "../../components/ProductCard";
import { Col, Row } from "antd";
import promotionV2 from "src/assets/images/promotion-v2.png";
import { useEffect, useState } from "react";
import productAPI, { Product } from "src/api/products";

type Props = {};

const Home = (props: Props) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  useEffect(() => {
    async function getProducts() {
      const query = {
        page: 1,
        limit: 4,
      };
      const res = await productAPI.getProducts(query);
      if (res.errorCode) {
      } else {
        setProducts(res.data);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="home">
      <div className="hero">
        <img src={hero} alt="hero" />
        <div className="hero-content">
          <h1>
            Phone accessories for people who love decorate their smart phone
          </h1>
          <Link to="/category">View collection</Link>
        </div>
      </div>
      <div className="container">
        <div className="promotion">
          <h1>What makes our brand different</h1>
          <PromotionItem />
        </div>

        <div className="product-list" id="about-us">
          <h1>Best seller</h1>
          <Row gutter={[30, 30]}>
            {products?.map((item, index) => {
              return (
                <Col md={6} xs={12} key={index}>
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    sale={item.sale}
                    price={item.price}
                    rate={item.rate}
                    thumbnail={
                      item.image[0] ??
                      "https://woopimages.com/uploads/products/thumbs/aesthetic-heart-brown-apple-iphone-13--silicone-phone-case-cover.webp"
                    }
                    key={index}
                  />
                </Col>
              );
            })}
          </Row>
          <p>
            <Link to="/category">View all</Link>
          </p>
        </div>
      </div>
      <div className="promotion-v2">
        <Row>
          <Col md={12} xs={24}>
            <div>
              <div id="contact-us">
                <h1>EC01-03</h1>
                <p>19127489 - Hoàng Thiện Nhân</p>
                <p>19127109 - Bùi Ngọc Chính</p>
                <p>19127451 - Lê Nguyễn Anh Khôi</p>
                <p>19127186 - Lê Thành Khôi</p>
              </div>
              <p className="link-container">
                <Link to="/policy">Privacy Policy</Link>
              </p>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div>
              <img src={promotionV2} alt="" width={"100%"} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
