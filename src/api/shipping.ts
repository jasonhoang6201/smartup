import { axiosClient } from ".";
import {objectToQueryString} from 'src/helpers/helperFunction'

export interface Shipping {
  id: string;
  name: string;
  type: string;
  hcm: number;
  hn: number;
}


interface ShippingResponse {
  errorCode: boolean | null;
  data: Array<Shipping>;
}

interface Query {
    page : number;
    limit: number;
    filters?: Object;
}

const shippingAPI = {
  async getShippings(query ?: Query): Promise<ShippingResponse> {
    let url ='/shipping'
    if(query){
        url += "?"+objectToQueryString(query)
    }
    const response: ShippingResponse = await axiosClient.get(url);
    return response;
  },
  
};

export default shippingAPI;
