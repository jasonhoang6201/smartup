import { Button, Modal, Rate, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import orderApi, { Order } from "src/api/order";
import useRouting from "src/hooks/UseRouting";
import DetailOrder from "./DetailOrder";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [rateItem, setRateItem] = React.useState(null);
  const navigate = useNavigate();
  const { generate } = useRouting();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [order, setOder] = React.useState<Array<Order>>([]);
  const [isModal, setIsModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState<any>(null);

  const handelCloseModal = () => {
    setEditItem(null);
    setIsModal(false);
    setEditItem(null);
  };
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
            return (
              <div className="items-center">
                <Tag color="blue">Pending</Tag>;
              </div>
            );
          case "Shipping":
            return (
              <div className="items-center">
                <Tag color="pink">Shipping</Tag>
              </div>
            );
          case "Done":
            return (
              <div className="items-center">
                <Tag color="green">Delivered</Tag>
              </div>
            );
          case "Cancel":
            return (
              <div className="items-center">
                <Tag color="red">Cancelled</Tag>
              </div>
            );
          default:
            return (
              <div className="items-center">
                <Tag color="blue">Pending</Tag>
              </div>
            );
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
    const res = await orderApi.getHistory(user.token);
    setOder(res.data ?? []);
    setIsLoading(false);
  };
  const handleTableChange = async (value: any) => {
    setCurrentPage(value.current);
  };
  useEffect(() => {
    if (!user) {
      navigate(generate("home"));
    } else {
      getData();
    }
  }, [user]);
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
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => {
              setIsModal(true);
              setEditItem(record);
            },
          };
        }}
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
      <Modal
        title="Order"
        visible={isModal}
        onOk={handelCloseModal}
        onCancel={handelCloseModal}
        okText={<span className="text-blue-500 hover:text-white">Update</span>}
        width={"80%"}
        destroyOnClose
      >
        <DetailOrder data={editItem?.product || []} order={editItem} />
      </Modal>
    </div>
  );
};

export default History;
