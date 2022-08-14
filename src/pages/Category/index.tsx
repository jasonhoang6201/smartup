import { Checkbox, Col, Form, Radio, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import hero from "src/assets/images/hero.png";
import ProductCard from "src/components/ProductCard";
import "./Category.scss";
import productAPI, { Product } from "src/api/products";
import supplierAPI, { Supplier } from "src/api/supplier";
type Props = {};

const Category = (props: Props) => {
  const params = useParams();
  const [title, setTitle] = React.useState("");
  const [form] = useForm();
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const [products, setProducts] = React.useState<Array<Product>>([]);
  const [brands, setBrands] = React.useState<Array<Supplier>>([]);
  async function getProducts(
    currentPage = 1,
    append = false,
    category?: string,
    brand?: string
  ) {
    const query = {
      page: currentPage,
      limit: 8,
      "filters[category]": category ?? "",
      "filters[brand]": brand ?? "",
    };
    const res = await productAPI.getProducts(query);
    if (res.errorCode) {
    } else {
      setProducts(append ? [...products, ...res.data] : res.data);
      setTotalPage(res.metadata.recordTotal);
    }
  }

  async function getBrands() {
    const res = await supplierAPI.getSuppliers();
    if (res.errorCode) {
    } else {
      setBrands(res.data);
    }
  }

  useEffect(() => {
    getProducts(1, false);
    setPage(1);
    getBrands();
  }, [title]);
  console.log(brands)

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
    if (form.getFieldValue("price")) {
      // const brandArray = form.getFieldValue("price");
      // brandArray.map((item: string, index: number) => {
      //   if (index === 0) {
      //     brand += item;
      //   } else {
      //     brand += "," + item;
      //   }
      // });
    }
    await getProducts(1, false, category, brand);
    setPage(1);
  };

  useLayoutEffect(() => {
    switch (params.category) {
      case "Charge":
        setTitle("Charge");
        break;
      case "Case":
        setTitle("Case");
        break;
      case "Headphone":
        setTitle("Headphone");
        break;
      case "Tempered Glass":
        setTitle("Tempered Glass");
        break;
      case "Protector":
        setTitle("Protector");
        break;
      case "Other":
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
      console.log(form.getFieldValue("category"));
      const categoryArray = form.getFieldValue("category");
      categoryArray.map((item: string, index: number) => {
        if (index === 0) {
          category += item;
        } else {
          category += "," + item;
        }
      });
    }
    await getProducts(page + 1, true, category, brand);
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
                    {brands.map((item) => {
                      return (
                        <label>
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
              {totalPage > page * 8 && (
                <div className="btn-view-more">
                  <button className="btn" onClick={() => handleLoadMore()}>
                    Load more
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Category;
