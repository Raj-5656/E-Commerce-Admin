export interface ColorImage {
    color: string;
    images: {
        url: string;
        alt: string;
    }[];
}

export interface Variant {
    color: string;
    size: string;
    stock: number;
}
export interface Category {
    _id: string,
    name: string
}
export interface SubCategory {
    _id: string,
    name: string,
    categoryId:Category
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    brand: string;
    category: Category,
    subCategory: SubCategory,
    discountPrice: number;
    price: number;
    totalStock: number;
    rating: number;
    numReviews: number;
    colorImages: ColorImage[];
    variants: Variant[];
}

export interface ProductListResponse {
    success: boolean;
    product: Product[];
    message?: string;
}

export interface SingleProductResponse {
    success: boolean;
    product: Product;
    message?: string;
}