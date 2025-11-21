import axiosInstance from "./axios";

export interface LoginData {
  identifier: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  firstname: string;
  role: string;
}



class AuthService {

  async login(loginData: LoginData) {
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;
  }

  async checkAuth(): Promise<{ user: User }> {
    const response = await axiosInstance.get('/auth/check');
    return response.data;
  }

  async logOut() {
    const response = await axiosInstance.post('./auth/logout');
    return response.data;
  }
}

export default new AuthService();