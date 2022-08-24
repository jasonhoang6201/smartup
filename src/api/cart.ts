import { axiosClient } from ".";
import { Product } from "./products";
export interface Cart {
  id: string;
  userId: string;
  product: Array<ItemInCart>;
}
export interface ItemInCart {
  code: string;
  price: string;
  product: Product;
  quantity: number;
}

interface CartResponse {
  errorCode: boolean | null;
  data: Cart;
}

interface Query {
  page: number;
  limit: number;
  filter?: string;
}

const cartAPI = {
  async getCart(token:string): Promise<CartResponse> {
    let url = "/cart";
    axiosClient.defaults.headers.common["token"] = token;
    let response: CartResponse = await axiosClient.get(url);
    if (!response.errorCode) {
      for (let i = 0; i < response?.data?.product?.length; i++) {
        response.data.product.map(
          (item) =>
            (item.price = (
              parseFloat(item.product.price) *
              (100 - parseFloat(item.product.sale)) / 100
            ).toFixed(2))
        );
      }
    }
    return response;
  },
  async updateCart(token:string, id?: string, quantity?: number, isIncreased?: boolean): Promise<CartResponse> {
    let url = "/cart";
    let data = {
      product: {
        code: id,
        quantity: quantity
      },
      isIncreased: isIncreased ?? false,
      isDeleted: false
    }
    if(quantity === 0){
      data.isDeleted = true
    }
    axiosClient.defaults.headers.common["token"] = token;
    let response: CartResponse = await axiosClient.patch(url, data);
    return response;
  }
};

export default cartAPI;
