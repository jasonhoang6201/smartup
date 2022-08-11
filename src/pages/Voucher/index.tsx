import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import VoucherCard from "./components/VoucherCard";
import "./Voucher.scss";
import voucherApi, { Voucher as IVoucher } from "src/api/voucher";
import { useDispatch, useSelector } from "react-redux";
import { User } from "src/redux/auth";
type Props = {};

const Voucher = (props: Props) => {
  const [vouchers, setVoucher] = useState<Array<IVoucher>>([]);
  const [youVouchers, setYourVoucher] = useState<Array<IVoucher>>([]);
  const userState: User = useSelector((state: any) => state.auth.user);
  async function getVouchers(currentPage = 1, append = false) {
    const query = {
      page: currentPage,
      limit: 50,
    };
    const res = await voucherApi.getVouchers(query);
    if (res.errorCode) {
    } else {
      setVoucher(append ? [...vouchers, ...res.data] : res.data);
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
      "filters[userId]":  userId ,
    };
    const res = await voucherApi.getVouchers(query);
    if (res.errorCode) {
    } else {
      setYourVoucher(append ? [...vouchers, ...res.data] : res.data);
    }
  }
  useEffect(() => {
    getVouchers(1, false);
  }, []);
  useEffect(() => {
    if (userState) {
      getYourVouchers(1, false, userState.id);
    }
  }, [userState]);
  return (
    <div className="voucher">
      <Tabs defaultActiveKey="profile" tabPosition={"left"}>
        <Tabs.TabPane tab={<span>Available Vouchers</span>} key="1">
          <Row gutter={[30, 30]}>
            {vouchers.map((item, idx) => (
              <Col md={12} xs={24} key={idx}>
                <VoucherCard
                  key={idx}
                  thumbnail="https://via.placeholder.com/150"
                  title={item.name}
                  description={item.description}
                  stock={item.stock}
                  isHad={false}
                />
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Your Vouchers</span>} key="2">
          <Row gutter={[30, 30]}>
            {youVouchers.map((item, idx) => (
              <Col md={12} xs={24} key={idx}>
                <VoucherCard
                  key={idx}
                  thumbnail="https://via.placeholder.com/150"
                  title={item.name}
                  description={item.description}
                  stock={item.stock}
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
