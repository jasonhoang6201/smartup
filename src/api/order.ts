import { axiosClient } from ".";
import { Product } from "./products";
import { ItemInCart } from "./cart";
import moment from "moment";
export interface Order {
  id: string;
  address: string;
  email: string;
  payment: string;
  phone: string;
  productPrice: number;
  shipPrice: number;
  shippingMethod: string;
  status: string;
  totalPrice: number;
  product: any;
  createdAt: string;
}

interface OrderResponse {
  errorCode: boolean | null;
  data: Array<Order>;
}

interface Query {
  page: number;
  limit: number;
  filter?: string;
}

const orderAPI = {
  async getOrder(): Promise<OrderResponse> {
    let url = "/order";
    let response: OrderResponse = await axiosClient.get(url);
    if (!response.errorCode) {
      response.data.map((item) => {
        item.createdAt = moment(moment(item.createdAt)).format("DD/MM/YYYY");
      });
    }
    return response;
  },
};

export default orderAPI;
