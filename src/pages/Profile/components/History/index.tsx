import { Button, Modal, Rate, Table, Tag } from "antd";
import React from "react";
import { FaHeart } from "react-icons/fa";

type Props = {
  data: Array<any>;
};

const History = (props: Props) => {
  const { data = [] } = props;
  const [isRateModal, setIsRateModal] = React.useState(false);
  const [rateItem, setRateItem] = React.useState(null);

  const handleCloseModal = () => {
    setRateItem(null);
    setIsRateModal(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      render: (_: string, record: any) => (
        <div className="product-image">
          <img
            src={"https://via.placeholder.com/100"}
            alt="product"
            height={100}
          />
        </div>
      ),
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_: string, record: any) => {
        return `$${parseFloat(record.price)}`;
      },
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: any) => {
        switch (record.status) {
          case "pending":
            return <Tag color="blue">Pending</Tag>;
          case "packing":
            return <Tag color="gold">Packing</Tag>;
          case "shipping":
            return <Tag color="pink">Shipping</Tag>;
          case "delivered":
            return <Tag color="green">Delivered</Tag>;
          case "cancelled":
            return <Tag color="red">Cancelled</Tag>;
          default:
            return <Tag color="blue">Pending</Tag>;
        }
      },
      width: "10%",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_: string, record: any) => {
        if (record.status === "delivered") {
          return (
            <Button
              type="primary"
              className="btn"
              style={{
                paddingTop: "0px",
                paddingBottom: "0px",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
              onClick={() => {
                setIsRateModal(true);
                setRateItem(record);
              }}
            >
              Rate
            </Button>
          );
        }
        return <></>;
      },
      width: "10%",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Rate"
        visible={isRateModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCloseModal}>
            Submit
          </Button>,
        ]}
      >
        <p>
          <Rate
            allowHalf
            value={2.5}
            onChange={(value) => {
              console.log(value);
            }}
            character={<FaHeart />}
            style={{ color: "red" }}
          />
        </p>
      </Modal>
    </div>
  );
};

export default History;
