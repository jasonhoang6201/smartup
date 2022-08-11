import { axiosClient } from ".";
import {objectToQueryString} from 'src/helpers/helperFunction'

export interface Voucher {
  id: string;
  name: string;
  description: string;
  price: string;
  user: Array<string>;
  endDate?: Date;
  stock: number;
}

interface VouchersResponse {
  errorCode: boolean | null;
  data: Array<Voucher>;
}

interface VoucherDetailResponse {
  errorCode: boolean | null;
  data: Voucher;
}
interface filter{
    userId: string
}
interface Query {
    page : number;
    limit: number;
    filters?: Object;
}

const voucherAPI = {
  async getVouchers(query ?: Query): Promise<VouchersResponse> {
    let url ='/voucher'
    if(query){
        url += "?"+objectToQueryString(query)
    }
    const response: VouchersResponse = await axiosClient.get(url);
    return response;
  },
  async getDetailVoucher(id ?: string): Promise<VoucherDetailResponse> {
    let url ='/voucher/'+`${id}`
    const response: VoucherDetailResponse = await axiosClient.get(url);
    return response;
  },
  async claimVoucher(id ?: string): Promise<VoucherDetailResponse> {
    let url ='/claim/'+`${id}`
    const response: VoucherDetailResponse = await axiosClient.post(url);
    return response;
  },
};

export default voucherAPI;
