import { Col, Row } from "antd";
import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "src/components/ProductCard";
import "./SearchResult.scss";
import productAPI, { Product } from "src/api/products";
type Props = {};

const SearchResult = (props: Props) => {
  const location = useLocation();
  const keyword = location.search.split("=")[1].replaceAll("%20", " ");
  const [result, setResult] = React.useState<Array<Product>>([]);
  console.log(keyword);
  async function getProducts(currentPage = 1, append = false) {
    const query = {
      page: currentPage,
      limit: 8,
      "filters[name]": keyword,
    };
    const res = await productAPI.getProducts(query);
    if (res.errorCode) {
    } else {
      setResult(append ? [...result, ...res.data] : res.data);
    }
  }
  useLayoutEffect(() => {
    getProducts(1, false);
  }, [keyword]);

  return (
    <div className="search-result">
      {result.length > 0 ? (
        <Row gutter={[30, 30]}>
          {result.map((item, index) => (
            <Col key={index} md={6} xs={12}>
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                sale={item.sale}
                rate={item.rate}
                thumbnail={item.image[0]}
                key={index}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="no-result">
          <h1>No result found for "{keyword}"</h1>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
