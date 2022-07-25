import { Button } from "antd";
import React from "react";
import { FaTimes } from "react-icons/fa";
import "./VoucherCard.scss";
type Props = {
  thumbnail: string;
  title: string;
  description: string;
  stock?: number;
  isHad: boolean;
};

const VoucherCard = (props: Props) => {
  const { thumbnail, title, description, stock, isHad } = props;
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
          <Button className="btn">Get</Button>
        </div>
      )}
    </div>
  );
};

export default VoucherCard;
