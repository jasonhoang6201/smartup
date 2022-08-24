import { axiosClient } from ".";

interface LoginRequest {
  email: string;
  password: string;
}
interface ForgotPass {
  email: string;
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
  async verify(token:string): Promise<VerifyResponse> {
    axiosClient.defaults.headers.common["token"] = token;
    const response: VerifyResponse = await axiosClient.get("/verify");
    return response;
  },
  async update(data: User, token: string): Promise<VerifyResponse> {
    let url = "/user/" + `${data.email}`;
    axiosClient.defaults.headers.common["token"] = token;
    const response: VerifyResponse = await axiosClient.patch(url, data);
    return response;
  },
  async register(data: LoginRequest): Promise<LoginResponse> {
    const response: LoginResponse = await axiosClient.post("/register", data);
    return response;
  },
  async forgotPassword(data: ForgotPass): Promise<LoginResponse> {
    const response: LoginResponse = await axiosClient.post("/forgotPassword", data);
    return response;
  },
};

export default userAPI;
