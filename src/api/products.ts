import { axiosClient } from ".";
import {objectToQueryString} from 'src/helpers/helperFunction'

export interface Product {
  id: string;
  name: string;
  description: string;
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
  relatedProducts:  relatedProducts;
}

interface relatedProducts {
  metadata: any,
  data:  Array<Product> | null
}

interface ProductsResponse {
  errorCode: boolean | null;
  data: Array<Product>;
  metadata: any
}

interface ProductDetailResponse {
  errorCode: boolean | null;
  data: Product;
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
    return response;
  },
  async getDetailProduct(id ?: string): Promise<ProductDetailResponse> {
    let url ='/product/'+`${id}`
    const response: ProductDetailResponse = await axiosClient.get(url);
    return response;
  },
};

export default productAPI;
