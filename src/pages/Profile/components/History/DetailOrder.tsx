import { Modal, Steps, Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import orderAPI from "src/api/order";

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
  const [current, setCurrent] = useState(1);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const user = useSelector((state: any) => state.auth.user);

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
    <div>
      <Steps
        current={current}
        className="mb-10"
        status={current === 3 ? "finish" : current === 0 ? "error" : "process"}
        progressDot={true}
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Table columns={columns} dataSource={data} rowKey="code" />
    </div>
  );
};

export default DetailOrder;
