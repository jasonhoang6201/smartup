import { Col, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import voucherApi, { Voucher as IVoucher } from "src/api/voucher";
import { User } from "src/redux/auth";
import VoucherCard from "./components/VoucherCard";
import "./Voucher.scss";
type Props = {};

const Voucher = (props: Props) => {
  const [vouchers, setVoucher] = useState<Array<IVoucher>>([]);
  const [youVouchers, setYourVoucher] = useState<Array<IVoucher>>([]);
  const [claim, setClaim] = useState(0);
  const userState: User = useSelector((state: any) => state.auth.user);
  async function getVouchers(currentPage = 1, append = false) {
    const query = {
      page: currentPage,
      limit: 50,
    };
    const res = await voucherApi.getVouchers(query, userState?.token);
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
      "filters[userId]": userId,
    };
    const res = await voucherApi.getVouchers(query, userState?.token);
    if (res.errorCode) {
    } else {
      setYourVoucher(append ? [...vouchers, ...res.data] : res.data);
    }
  }
  useEffect(() => {
    getVouchers(1, false);
  }, [claim]);
  useEffect(() => {
    if (userState) {
      getYourVouchers(1, false, userState.id);
    }
  }, [userState, claim]);
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
                  id={item.id}
                  isHad={false}
                  claim={claim}
                  onClaim={setClaim}
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
                  key={item.id}
                  thumbnail="https://via.placeholder.com/150"
                  title={item.name}
                  description={item.description}
                  stock={item.stock}
                  id={item.id}
                  isHad={true}
                  claim={claim}
                  onClaim={setClaim}
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
