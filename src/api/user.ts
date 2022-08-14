import { axiosClient } from ".";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  errorCode: boolean | null;
  data: User;
}
export interface User {
  id: string;
  name: string;
  email: string;
  token: any;
  address: string;
  phone: string;
  gender: string;
  birthday: string;
}

interface VerifyResponse {
  errorCode: boolean | null;
  data: User;
}

const userAPI = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response: LoginResponse = await axiosClient.post("/login", data);
    return response;
  },
  async verify(): Promise<VerifyResponse> {
    const response: VerifyResponse = await axiosClient.get("/verify");
    return response;
  },
  async update(data: User): Promise<VerifyResponse> {
    let url = "/user/" + `${data.email}`;
    const response: VerifyResponse = await axiosClient.patch(url, data);
    return response;
  },
};

export default userAPI;
