import { Checkbox, Col, Form, Radio, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import hero from "src/assets/images/hero.png";
import ProductCard from "src/components/ProductCard";
import "./Category.scss";
import productAPI, { Product } from "src/api/products";
type Props = {};

const Category = (props: Props) => {
  const params = useParams();
  const [title, setTitle] = React.useState("");
  const [form] = useForm();
  const [page, setPage] = React.useState(1);

  const [products, setProducts] = React.useState<Array<Product>>([]);
  async function getProducts(currentPage = 1, append = false) {
    const query = {
      page: currentPage,
      limit: 10,
    };
    const res = await productAPI.getProducts(query);
    if (res.errorCode) {
    } else {
      setProducts(append ? [...products,...res.data] : res.data);
    }
  }
  useEffect(() => {
    getProducts(1, false);
    setPage(1)
  }, [title]);

  const handleFilter = () => {
    console.log(form.getFieldsValue());
  };

  useLayoutEffect(() => {
    switch (params.category) {
      case "charge":
        setTitle("Charge");
        break;
      case "case":
        setTitle("Case");
        break;
      case "headphone":
        setTitle("Headphone");
        break;
      case "tempered-glass":
        setTitle("Tempered Glass");
        break;
      case "protector":
        setTitle("Protector");
        break;
      case "other":
        setTitle("Other");
        break;
      default:
        setTitle("All products");
    }
  }, [params]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (params?.category) {
      form.setFieldsValue({
        category: [params.category],
        price: 0,
        brand: [],
      });
    } else {
      form.setFieldsValue({
        category: [],
        price: 0,
        brand: [],
      });
    }
  }, [form, params]);
  const handleLoadMore = async () => {
    await getProducts(page + 1, true);
    setPage(page + 1);
  };

  return (
    <div className="category">
      <div className="hero">
        <img src={hero} alt="" width={"100%"} height={"200px"} />
        <h3>{title}</h3>
      </div>
      <div className="category-wrapper">
        <Row>
          <Col md={4} xs={0}>
            <Form form={form} onFinish={handleFilter}>
              <ul>
                <h4>Category</h4>
                <Form.Item name="category">
                  <Checkbox.Group>
                    <label>
                      <li>
                        <Checkbox value={"charge"} />
                        Charge
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"case"} />
                        Case
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"headphone"} />
                        Headphone
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"tempered glass"} />
                        Tempered Glass
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"protector"} />
                        Protector
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"other"} />
                        Other
                      </li>
                    </label>
                  </Checkbox.Group>
                </Form.Item>
              </ul>
              <ul>
                <h4>Price</h4>
                <Form.Item name="price" initialValue={0}>
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
                  </Radio.Group>
                </Form.Item>
              </ul>
              <ul>
                <h4>Brand</h4>
                <Form.Item name="brand">
                  <Checkbox.Group>
                    <label>
                      <li>
                        <Checkbox value={"apple"} />
                        Apple
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"magnolia"} />
                        Magnolia
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"olive"} />
                        Olive
                      </li>
                    </label>
                    <label>
                      <li>
                        <Checkbox value={"beats"} />
                        Beats
                      </li>
                    </label>
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
          <Col md={20} xs={24}>
            <div className="product-list">
              <Row gutter={[30, 30]}>
                {products.map((item, index) => {
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
              <div className="btn-view-more">
                <button className="btn" onClick={() => handleLoadMore()}>
                  Load more
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Category;
