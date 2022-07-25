import { Col, Row, Tabs } from "antd";
import React from "react";
import VoucherCard from "./components/VoucherCard";
import "./Voucher.scss";

type Props = {};

const Voucher = (props: Props) => {
  return (
    <div className="voucher">
      <Tabs defaultActiveKey="profile" tabPosition={"left"}>
        <Tabs.TabPane tab={<span>Available Vouchers</span>} key="1">
          <Row gutter={[30, 30]}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <Col md={12} xs={24}>
                <VoucherCard
                  thumbnail="https://via.placeholder.com/150"
                  title="Voucher Title"
                  description="Voucher Description"
                  stock={10}
                  isHad={false}
                />
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Your Vouchers</span>} key="2">
          <Row gutter={[30, 30]}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <Col md={12} xs={24}>
                <VoucherCard
                  thumbnail="https://via.placeholder.com/150"
                  title="Voucher Title"
                  description="Voucher Description"
                  stock={10}
                  isHad={true}
                />
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Voucher;
