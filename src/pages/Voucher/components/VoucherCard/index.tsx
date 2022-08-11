import { Button } from "antd";
import React from "react";
import { FaTimes } from "react-icons/fa";
import "./VoucherCard.scss";
import { useSelector } from "react-redux";
import { User } from "src/redux/auth";
import voucherApi, { Voucher as IVoucher } from "src/api/voucher";
type Props = {
  thumbnail: string;
  title: string;
  description: string;
  stock?: number;
  isHad: boolean;
  id: string;
};

const VoucherCard = (props: Props) => {
  const { thumbnail, title, description, stock, isHad, id } = props;
  const userState: User = useSelector((state: any) => state.auth.user);
  async function claimVoucher(id: string) {
    const res = await voucherApi.claimVoucher(id);
    if (res.errorCode) {
    } else {
    }
  }
  const handleAddVoucher = async () => {
    if (!userState.id) {
    } else {
      const res = await claimVoucher(id)
    }
  };
  return (
    <div className="voucher-card">
      <div className="voucher-card-wrapper">
        <div className="voucher-card__thumbnail">
          <img src={thumbnail} alt="voucher" />
        </div>
        <div className="voucher-card__content">
          <h1 className="voucher-card__title">{title}</h1>
          <p className="voucher-card__description">{description}</p>
          {!isHad && <div className="voucher-card__stock">Remain: {stock}</div>}
        </div>
      </div>
      {!isHad && (
        <div className="voucher-card-get">
          <Button className="btn" onClick={() => handleAddVoucher()}>
            Get
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoucherCard;
