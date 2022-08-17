import { Checkbox, Col, Form, Radio, Row } from "antd";
import React, { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "src/components/ProductCard";
import "./SearchResult.scss";
import productAPI, { Product } from "src/api/products";
import { useForm } from "antd/lib/form/Form";
import supplierAPI from "src/api/supplier";
type Props = {};

const SearchResult = (props: Props) => {
  const location = useLocation();
  const keyword = location.search.split("=")[1].replaceAll("%20", " ");
  const [result, setResult] = React.useState<Array<Product>>([]);
  const [form] = useForm();
  const [brands, setBrands] = React.useState<Array<any>>([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [products, setProducts] = React.useState<Array<Product>>([]);

  const handleLoadMore = async () => {
    let category = "";
    let brand = "";
    if (form.getFieldValue("brand")) {
      const brandArray = form.getFieldValue("brand");
      brandArray.map((item: string, index: number) => {
        if (index === 0) {
          brand += item;
        } else {
          brand += "," + item;
        }
      });
    }
    if (form.getFieldValue("category")) {
      const categoryArray = form.getFieldValue("category");
      categoryArray.map((item: string, index: number) => {
        if (index === 0) {
          category += item;
        } else {
          category += "," + item;
        }
      });
    }
    const price = form.getFieldValue("price");
    await getProducts(page + 1, true, false, category, brand, price);
    setPage(page + 1);
  };

  async function getBrands() {
    const res = await supplierAPI.getSuppliers();
    if (res.errorCode) {
    } else {
      setBrands(res.data);
    }
  }

  async function getProducts(
    currentPage = 1,
    append = false,
    needParams = false,
    category?: string,
    brand?: string,
    price?: number
  ) {
    const query = {
      page: currentPage,
      limit: 8,
      "filters[category]": "",
      "filters[brand]": brand ?? "",
      "filters[price]": price ?? 4,
    };
    const res = await productAPI.getProducts(query);
    if (res.errorCode) {
    } else {
      setProducts(append ? [...products, ...res.data] : res.data);
      setTotalPage(res.metadata.recordTotal);
    }
  }

  const handleFilter = async () => {
    let category = "";
    let brand = "";
    if (form.getFieldValue("brand")) {
      const brandArray = form.getFieldValue("brand");
      brandArray.map((item: string, index: number) => {
        if (index === 0) {
          brand += item;
        } else {
          brand += "," + item;
        }
      });
    }
    if (form.getFieldValue("category")) {
      const categoryArray = form.getFieldValue("category");
      categoryArray.map((item: string, index: number) => {
        if (index === 0) {
          category += item;
        } else {
          category += "," + item;
        }
      });
    }
    const price = form.getFieldValue("price");
    await getProducts(1, false, false, category, brand, price);
    setPage(1);
  };

  useEffect(() => {
    getProducts(1, false, true);
    setPage(1);
    getBrands();
  }, [keyword]);

  useLayoutEffect(() => {
    getProducts(1, false);
  }, [keyword]);

  return (
    <div className="search-result">
      {result.length > 0 ? (
        <Row gutter={[30, 30]}>
          <Col md={4} xs={0}>
            <Form form={form} onFinish={handleFilter}>
              <ul>
                <h4>Category</h4>
                <Form.Item name="category">
                  <Checkbox.Group>
                    <label>
                      <li>
                        <Checkbox value={"Charge"} />
                        Charge
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"Case"} />
                        Case
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"Headphone"} />
                        Headphone
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"Tempered Glass"} />
                        Tempered Glass
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"Protector"} />
                        Protector
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"Other"} />
                        Other
                      </li>
                    </label>
                  </Checkbox.Group>
                </Form.Item>
              </ul>
              <ul>
                <h4>Price</h4>
                <Form.Item name="price" initialValue={4}>
                  <Radio.Group>
                    <label>
                      <li>
                        <Radio value={0}>$0 - $50</Radio>
                      </li>
                    </label>
                    <label>
                      <li>
                        <Radio value={1}>$50 - $100</Radio>
                      </li>
                    </label>
                    <label>
                      <li>
                        <Radio value={2}>$100 - $200</Radio>
                      </li>
                    </label>
                    <label>
                      <li>
                        <Radio value={3}>$200+</Radio>
                      </li>
                    </label>
                    <label>
                      <li>
                        <Radio value={4}>All Price</Radio>
                      </li>
                    </label>
                  </Radio.Group>
                </Form.Item>
              </ul>
              <ul>
                <h4>Brand</h4>
                <Form.Item name="brand">
                  <Checkbox.Group>
                    {brands.map((item, index) => {
                      return (
                        <label key={index}>
                          <li>
                            <Checkbox value={item.companyName} />
                            {item.companyName}
                          </li>
                        </label>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </ul>
              <Form.Item>
                <button type="submit" className="btn">
                  Filter
                </button>
              </Form.Item>
            </Form>
          </Col>
          <Col md={20}>
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
          </Col>
        </Row>
      ) : (
        <div className="no-result">
          <h1>No result found for "{keyword}"</h1>
        </div>
      )}
      <div className="btn-group">
        {totalPage > page * 8 && (
          <div className="btn-view-more">
            <button className="btn" onClick={() => handleLoadMore()}>
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
