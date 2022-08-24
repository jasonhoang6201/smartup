import { Button } from "antd";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import voucherApi from "src/api/voucher";
import { User } from "src/redux/auth";
import "./VoucherCard.scss";
type Props = {
  thumbnail: string;
  title: string;
  description: string;
  stock?: number;
  isHad: boolean;
  id: string;
  claim: number;
  onClaim: Function;
};

const VoucherCard = (props: Props) => {
  const { thumbnail, title, description, stock, isHad, id, claim, onClaim } =
    props;
  const userState: User = useSelector((state: any) => state.auth.user);
  async function claimVoucher(id: string) {
    const res = await voucherApi.claimVoucher(id);
    if (res.errorCode) {
      return toast.error("Cannot claim Voucher", {position:"top-right"})
    } else {
      onClaim(claim + 1);
      return toast.success("Voucher has been claimed", {position:"top-right"});
    }
  }
  const handleAddVoucher = async () => {
    if (!userState.id) {
    } else {
      await claimVoucher(id);
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
