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
import React from "react";
import "./ModalCheckout.scss";
import momo from "src/assets/images/momo.png";
import vnpay from "src/assets/images/vnpay.png";

type Props = {
  visible: boolean;
  onCancel: () => void;
};

const ModalCheckout = (props: Props) => {
  const { visible = false, onCancel = () => {} } = props;
  const [form] = useForm();

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <div className="checkout">
        <div className="checkout-header">
          <div className="checkout-header-title">
            <h3>Checkout</h3>
          </div>
        </div>
        <Form form={form}>
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
                <Form.Item name={"payment"}>
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
                <Form.Item>
                  <Select>
                    <Select.Option value={"free"}>
                      Giao hàng tiết kiệm
                    </Select.Option>
                    <Select.Option value={"normal"}>
                      Giao hàng nhanh
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="sum-up">
              <div className="ship">
                <h3>Shipping:</h3>
                <h3>Free</h3>
              </div>
              <div className="total">
                <h3>Total:</h3>
                <h3>$0</h3>
              </div>
            </div>
            <div className="btn-container">
              <Button htmlType="submit" className="btn">
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
