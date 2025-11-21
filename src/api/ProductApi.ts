import type { ProductListResponse, SingleProductResponse } from "../types/Product";
import axiosInstance from "./axios";

class ProductApi {
    async getAllProduct(): Promise<ProductListResponse> {
        const response = await axiosInstance.get('/products')
        return response.data
    }
    async getLatestProduct(): Promise<ProductListResponse> {
        const response = await axiosInstance.get('/products/latest')
        return response.data
    }
    async getProductById(id: string): Promise<SingleProductResponse> {
    const response = await axiosInstance.get(`/products/id=${id}`);
    return response.data;
  }
}

export default new ProductApi()