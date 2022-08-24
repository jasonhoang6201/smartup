import { Button, Modal, Steps, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import orderAPI from "src/api/order";
import RateOrder from "../RateOrder";
import "./DetailOrder.scss";

const { Step } = Steps;
const steps = [
  {
    title: "Cancel",
  },
  {
    title: "Pending",
  },
  {
    title: "Shipping",
  },
  {
    title: "Done",
  },
];

type Props = {
  data: any;
  order: any;
};

const DetailOrder = (props: Props) => {
  const { data, order } = props;
  const [isRateModal, setIsRateModal] = useState<boolean>(false);
  const [current, setCurrent] = useState(1);
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    steps.map((item, index) => {
      if (item.title === order.status) {
        setCurrent(index);
      }
    });
  }, []);
  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (text: string, record: any) => {
        return (
          <img
            src={record?.product?.image[0]}
            alt="image"
            width="100"
            height={100}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="text-center">{record?.product?.name}</div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: string, record: any) => (
        <div className="text-center">{record?.product?.price}</div>
      ),
    },
    {
      title: "Sale",
      dataIndex: "sale",
      key: "sale",
      render: (text: string, record: any) => (
        <div className="text-center">{record?.product?.sale}</div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: string, record: any) => (
        <div className="text-center">{record?.quantity}</div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text: string, record: any) => (
        <div className="text-center">{record?.price}</div>
      ),
    },
  ];

  return (
    <div className="detail-order">
      <Steps
        current={current}
        style={{ marginBottom: "2rem" }}
        status={current === 3 ? "finish" : current === 0 ? "error" : "process"}
        progressDot={true}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Table columns={columns} dataSource={data} rowKey="code" />
      {current === 3 && (
        <div className="rate-button">
          <Button className="btn" onClick={() => setIsRateModal(true)}>
            Rate this cart
          </Button>
        </div>
      )}
      <Modal
        visible={isRateModal}
        title="Rate"
        okText="Rate"
        cancelText="Cancel"
        onCancel={() => setIsRateModal(false)}
      >
        <RateOrder product={order.product} />
      </Modal>
    </div>
  );
};

export default DetailOrder;
