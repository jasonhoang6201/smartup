import { Col, Row } from "antd";
import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "src/components/ProductCard";
import "./SearchResult.scss";

type Props = {};

const SearchResult = (props: Props) => {
  const location = useLocation();
  const keyword = location.search.split("=")[1].replaceAll("%20", " ");
  const [result, setResult] = React.useState<Array<any>>([]);

  useLayoutEffect(() => {
    //call api trong này
  }, []);

  return (
    <div className="search-result">
      {result.length > 0 ? (
        <Row>
          {result.map((item, index) => (
            <Col key={index} md={6} xs={12}>
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                sale={item.sale}
                rate={item.rate}
                thumbnail={item.thumbnail}
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
