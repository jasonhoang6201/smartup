import { Table } from "antd";
import React, { useEffect, useLayoutEffect } from "react";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartAPI, { ItemInCart } from "src/api/cart";
import ModalCheckout from "src/components/ModalCheckout";
import QuantityButton from "src/components/QuantityButton";
import useRouting from "src/hooks/UseRouting";
import { handleCart } from "src/redux/cart";
import "./Cart.scss";
type Props = {};

const Cart = (props: Props) => {
  const user = useSelector((state: any) => state.auth.user);
  const cartState = useSelector((state: any) => state.cart.number);
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = React.useState(0);
  const navigate = useNavigate();
  const { generate } = useRouting();

  const [isCheckoutModal, setIsCheckoutModal] = React.useState(false);

  const handleDeleteCart = (id: string) => {
    const res = cartAPI.updateCart(id, 0);
    dispatch(handleCart(cartState - 1));
  };

  const onChangeValue = async (value: number, index: number, id: string) => {
    const res = await cartAPI.updateCart(id, value);
    if (!res.errorCode) {
      setData(
        data.map((item, i) => {
          if (i === index) {
            return { ...item, quantity: value };
          }
          return item;
        })
      );
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_: string, record: any) => (
        <div className="product-info">
          <div className="product-image">
            <img src={record.product.image[0]} alt="product" height={100} />
          </div>
          <div className="product-name">
            <h1>{record.product.name}</h1>
            <p>{record.product.description}</p>
          </div>
        </div>
      ),
      width: "60%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render(_: string, record: any, index: number) {
        return (
          <QuantityButton
            value={record.quantity}
            onChange={(value) => {
              onChangeValue(value, index, record.code);
            }}
          />
        );
      },
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: string, record: any) => {
        return `$${parseFloat(record.price) * record.quantity}`;
      },
      width: "20%",
    },
    {
      render: (_: string, record: any) => {
        return (
          <div className="product-action">
            <FaTimes onClick={() => handleDeleteCart(record.code)} />
          </div>
        );
      },
      width: "1%",
    },
  ];
  const [data, setData] = React.useState<Array<ItemInCart>>([]);

  const getData = async () => {
    const res = await cartAPI.getCart();
    setData(res.data.product ?? []);
  };

  useEffect(() => {
    if (!user) {
      navigate(generate("home"));
    } else {
      getData();
    }
  }, [user, navigate, cartState]);

  useLayoutEffect(() => {
    setSubTotal(
      data.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
      )
    );
  }, [data]);

  return (
    <div className="cart">
      <h1>Your shopping cart</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="code"
      />

      <div className="checkout">
        <h3>
          Subtotal: <span>${subTotal}</span>
        </h3>
        <p>Shipping and total will be calculated at checkout</p>
        <button className="btn" onClick={() => setIsCheckoutModal(true)}>
          Checkout
        </button>
      </div>

      <ModalCheckout
        visible={isCheckoutModal}
        onCancel={() => setIsCheckoutModal(false)}
      />
    </div>
  );
};

export default Cart;
