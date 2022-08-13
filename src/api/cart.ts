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
  async getCart(): Promise<CartResponse> {
    let url = "/cart";
    let response: CartResponse = await axiosClient.get(url);
    if (response.data) {
      for (let i = 0; i < response?.data?.product?.length; i++) {
        response.data.product.map(
          (item) =>
            (item.price = (
              parseFloat(item.product.price) *
              (1 - parseFloat(item.product.sale))
            ).toFixed(2))
        );
      }
    }
    return response;
  },
  async updateCart(id: string, quantity: number): Promise<CartResponse> {
    let url = "/cart";
    console.log(id)
    const data = {
      product: {
        code: id,
        quantity: quantity
      }
    }
    let response: CartResponse = await axiosClient.patch(url, data);
    return response;
  }
};

export default cartAPI;
