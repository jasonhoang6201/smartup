import { Button, Modal, Rate, Table, Tag } from "antd";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import orderApi, { Order } from "src/api/order";
import useRouting from "src/hooks/UseRouting";
import { useDispatch, useSelector } from "react-redux";
type Props = {
  data: Array<any>;
};

// {
//   id: "1",
//   date: "2020-01-01",
//   price: "100",
//   total: "100000",
//   status: "delivered",
// },

const History = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [isRateModal, setIsRateModal] = React.useState(false);
  const [rateItem, setRateItem] = React.useState(null);
  const navigate = useNavigate();
  const { generate } = useRouting();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [order, setOder] = React.useState<Array<Order>>([]);
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
            src={record.product[0].product.image[0]}
            alt="product"
            height={100}
          />
        </div>
      ),
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "price",
      render: (_: string, record: any) => {
        return `$${parseFloat(record.totalPrice)}`;
      },
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: string, record: any) => {
        switch (record.status) {
          case "Pending":
            return <Tag color="blue">Pending</Tag>;
          case "Shipping":
            return <Tag color="pink">Shipping</Tag>;
          case "Delivered":
            return <Tag color="green">Delivered</Tag>;
          case "Cancelled":
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
  const getData = async () => {
    const res = await orderApi.getOrder();
    setOder(res.data ?? []);
  };
  const handleTableChange = async (value:any) => {
    setCurrentPage(value.current);
  };
  useEffect(() => {
    if (!user) {
      navigate(generate("home"));
    } else {
      getData();
    }
  }, [user, navigate]);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={order}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: 4,
        }}
        onChange={handleTableChange}
      />

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
