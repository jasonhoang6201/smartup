import { axiosClient } from ".";
import { objectToQueryString } from "src/helpers/helperFunction";

export interface Supplier {
  id: string;
  companyName: string;
  country: string;
  address: string;
}

interface SupplierResponse {
  errorCode: boolean | null;
  data: Array<Supplier>;
}

export interface Query {
  page: number;
  limit: number;
  filter?: string;
}

const supplierAPI = {
  async getSuppliers(): Promise<SupplierResponse> {
    let url = "/supplier";
    const response: SupplierResponse = await axiosClient.get(url);
    return response;
  },
};

export default supplierAPI;
