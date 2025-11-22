export interface CategoryListResponse {
    success: boolean;
    data: Category[];
    message?: string;
}

export interface Category {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean,
}