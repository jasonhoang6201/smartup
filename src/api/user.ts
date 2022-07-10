import { axiosClient } from ".";

interface LoginRequest {
    email: string;
    password: string;
}
interface LoginResponse {
    error: boolean;
    data: string;
}
interface User {
    id: number;
    name: string;
    email: string;
}

const userAPI = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await axiosClient.post('/login', data);
        return response.data;
    }
}

export default userAPI;