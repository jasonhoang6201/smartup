import { axiosClient } from ".";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  errorCode?: boolean;
  data: User;
}
interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface VerifyResponse {
  data: User;
}

const userAPI = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosClient.post("/login", data);
    console.log(response)
    return response;
  },
  async verify(): Promise<VerifyResponse> {
    const response = await axiosClient.get("/verify");
    return response;
  },
};

export default userAPI;
