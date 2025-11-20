import axiosInterceptor from "./axios";

export interface LoginData {
  identifier: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}



class AuthService {

  async login(loginData: LoginData) {
    const response = await axiosInterceptor.post('/auth/login', loginData);
    return response.data;
  }

  async checkAuth(): Promise<{ user: User }> {
    const response = await axiosInterceptor.get('/auth/check');
    return response.data;
  }
}

export default new AuthService();