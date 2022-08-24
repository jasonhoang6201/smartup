import React, { useState } from "react";
import "./RateOrder.scss";
import { Rate, Table } from "antd";
import { FaHeart } from "react-icons/fa";

type Props = {
  product: any[];
};

const RateOrder = (props: Props) => {
  const { product = [] } = props;
  const [formData, setFormData] = useState(
    product.map((item) => ({
      code: item.code,
      rate: 0,
    })) || []
  );
  console.log(product);

  const handleRateProduct = (code: string, rate: number) => {
    const temp = formData;
    temp.forEach((item) => {
      if (item.code === code) {
        item.rate = rate;
      }
    });
    setFormData([...temp]);
  };

  console.log("formad", formData);

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
      title: "",
      dataIndex: "rate",
      key: "rate",
      render: (text: string, record: any) => (
        <div className="rate">
          <Rate
            allowHalf
            value={formData.find((item) => item.code === record.code)?.rate}
            onChange={(value) => handleRateProduct(record.code, value)}
            character={<FaHeart />}
            style={{ color: "red" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="rate-order">
      <Table columns={columns} rowKey="id" dataSource={product} />
    </div>
  );
};

export default RateOrder;
