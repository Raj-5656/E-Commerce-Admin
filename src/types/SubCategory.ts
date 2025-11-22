import type { Category } from "./Category";

export interface SubCategoryListResponse {
    success: boolean;
    data: SubCategory[];
    message?: string;
}

export interface SubCategory {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean,
    categoryId:Category
}