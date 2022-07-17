import { axiosClient } from ".";
import {objectToQueryString} from 'src/helpers/helperFunction'

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  supplierId: string;
  image: Array<string>;
  price: string;
  sale: string;
  dimension: string;
  warranty: string;
  color: Array<string>;
  sold: number;
  rate?: number;
}

interface ProductsResponse {
  errorCode: boolean | null;
  data: Array<Product>;
}
interface Query {
    page : number;
    limit: number;
    filter?: string;
}

const productAPI = {
  async getProducts(query ?: Query): Promise<ProductsResponse> {
    let url ='/product'
    if(query){
        url += "?"+objectToQueryString(query)
    }
    const response: ProductsResponse = await axiosClient.get(url);
    console.log(response);
    return response;
  },
};

export default productAPI;
