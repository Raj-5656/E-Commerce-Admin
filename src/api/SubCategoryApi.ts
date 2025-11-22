import type { SubCategoryListResponse } from "../types/SubCategory"
import axiosInstance from "./axios"
export interface subCategoryData {
    name: string,
    categoryId: string
}
class SubCategoryApi {
    async getAllSubCategory(): Promise<SubCategoryListResponse> {
        const response = await axiosInstance.get('/sub-category')
        return response.data
    }
    createSubCategory = async (payload: subCategoryData) => {
        const response = await axiosInstance.post('/sub-category', payload)
        return response.data

    }
}
export default new SubCategoryApi()