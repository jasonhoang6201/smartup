import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Table,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import "./ModalCheckout.scss";
import momo from "src/assets/images/momo.png";
import vnpay from "src/assets/images/vnpay.png";
import voucherApi, { Voucher as IVoucher } from "src/api/voucher";
import shippingApi, { Shipping as IShipping } from "src/api/shipping";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "src/redux/auth";
import location from "src/location/location.json";

type Props = {
  total: number;
  visible: boolean;
  onCancel: () => void;
};
interface Location {
  name: string;
  value: number;
}
const ModalCheckout = (props: Props) => {
  const { total = 0, visible = false, onCancel = () => {} } = props;
  const [district, setDistrict] = useState<Array<any>>([]);
  const [vouchers, setVoucher] = useState<Array<IVoucher>>([]);
  const [shipping, setShipping] = useState<Array<IShipping>>([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [form] = useForm();
  const userState: User = useSelector((state: any) => state.auth.user);
  async function getShipping() {
    const res = await shippingApi.getShippings();
    if (res.errorCode) {
    } else {
      setShipping(res.data);
    }
  }
  async function getYourVouchers(
    currentPage = 1,
    append = false,
    userId?: string
  ) {
    const query = {
      page: currentPage,
      limit: 50,
      "filters[userId]": userId,
    };
    const res = await voucherApi.getVouchers(query);
    if (res.errorCode) {
    } else {
      setVoucher(append ? [...vouchers, ...res.data] : res.data);
    }
  }
  const onChangeValue = (value: any) => {
    if (value.shippingMethod) {
      const tempShipping = shipping.filter(
        (item) => item.type === value.shippingMethod
      )[0];
      if (form.getFieldValue("city") === "hn") {
        setShippingFee(tempShipping.hn);
      } else if (form.getFieldValue("city") === "hcm") {
        setShippingFee(tempShipping.hcm);
      }
    }
    if (value.city) {
      const tempShipping = shipping.filter(
        (item) => item.type === form.getFieldValue("shippingMethod")
      )[0];
      if (value.city === "hn") {
        setDistrict(location.hn);
        form.setFieldsValue({
          district: ""
        })
        if (tempShipping) {
          setShippingFee(tempShipping.hn);
        }
      } else if (value.city === "hcm") {
        setDistrict(location.hcm);
        form.setFieldsValue({
          district: ""
        })
        if (tempShipping) {
          setShippingFee(tempShipping.hcm);
        }
      }
    }
  };
  const onFinish =() => {
    let data = {
      phone: userState.phone,
      ...form.getFieldsValue(),
      productPrice: total,
      shipPrice: shippingFee,
      totalPrice: total + shippingFee
    }
    
    console.log(form.getFieldsValue())
  }
  useEffect(() => {
    setDistrict([]);
    getShipping();
    getYourVouchers(1, false, userState.id);
  }, []);
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <div className="checkout">
        <div className="checkout-header">
          <div className="checkout-header-title">
            <h3>Checkout</h3>
          </div>
        </div>
        <Form form={form} onValuesChange={(v) => onChangeValue(v)}>
          <div className="checkout-body">
            <Row>
              <Col md={6}>
                <h3>Name:</h3>
              </Col>
              <Col md={18}>
                <Form.Item
                  name={"name"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input className="custom-input" placeholder="Full name" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h3>City:</h3>
              </Col>
              <Col md={18}>
                <Form.Item
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please input your city!",
                    },
                  ]}
                >
                  <Select className="custom-select">
                    <Select.Option value={"hcm"}>Hồ Chí Minh</Select.Option>
                    <Select.Option value={"hn"}>Hà Nội</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h3>District:</h3>
              </Col>
              <Col md={18}>
                <Form.Item
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Please input your district!",
                    },
                  ]}
                >
                  <Select className="custom-select">
                    {district.map((item) => {
                      return (
                        <Select.Option value={item.value} key={item.name}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h3>Address:</h3>
              </Col>
              <Col md={18}>
                <Form.Item
                  name={"address"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <Input className="custom-input" placeholder="Address" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h3>Phone:</h3>
              </Col>
              <Col md={18}>
                <Form.Item
                  name={"phone"}
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone!",
                    },
                  ]}
                >
                  <Input className="custom-input" placeholder="Phone" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="payment-container">
              <Col md={6}>
                <h3>Payment:</h3>
              </Col>
              <Col md={18}>
                <Form.Item name={"payment"}  rules={[
                    {
                      required: true,
                      message: "Please choose your payment method!",
                    },
                  ]}>
                  <Radio.Group>
                    <Radio value={"momo"}>
                      <span className="payment-logo">
                        <img src={momo} alt="momo" />
                      </span>
                    </Radio>
                    <Radio value={"vnpay"}>
                      <span className="payment-logo">
                        <img src={vnpay} alt="vnpay" />
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h3>Shipping:</h3>
              </Col>
              <Col md={18}>
                <Form.Item name={"shippingMethod"}>
                  <Select className="custom-select">
                    {shipping.map((item) => {
                      return (
                        <Select.Option value={item.type} key={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                    {/* <Select.Option value={"free"}>
                      Giao hàng tiết kiệm
                    </Select.Option>
                    <Select.Option value={"normal"}>
                      Giao hàng nhanh
                    </Select.Option> */}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h3>Voucher:</h3>
              </Col>
              <Col md={18}>
                <Form.Item name={"voucherId"}>
                  <Select className="custom-select">
                    {vouchers.map((item) => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="sum-up">
              <div className="ship">
                <h3>Shipping:</h3>
                <h3>${shippingFee}</h3>
              </div>
              <div className="total">
                <h3>Total:</h3>
                <h3>${total + shippingFee}</h3>
              </div>
            </div>
            <div className="btn-container">
              <Button htmlType="submit" className="btn" onClick={onFinish}>
                Checkout
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCheckout;
