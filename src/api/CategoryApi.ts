import axiosInstance from "./axios"

export interface categoryData {
    name:string
}

class CategoryApi {
    
     getALlCategory = async () => {

        const response = await axiosInstance.get('/category')
        console.log(response);
        return response.data
        
    }
    createCategory = async (payload : categoryData) => {
        const response =await axiosInstance.post('/category',payload)
        return response.data

    }

}
export default new CategoryApi();