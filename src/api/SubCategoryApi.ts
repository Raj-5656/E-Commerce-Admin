import axiosInstance from "./axios"

export interface subCategoryData {
    name:string,
    categoryId:string
}

class SubCategoryApi {
    

    createSubCategory = async (payload : subCategoryData) => {
        const response =await axiosInstance.post('/sub-category',payload)
        return response.data

    }
    
}
export default new SubCategoryApi();