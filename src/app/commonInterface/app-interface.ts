export interface AppInterface {
}

export interface ProdCategory{
    id: number,
    name: string,
    label: string
}

export interface ProdCategoryItem{
    id: number,
    name: string
}

export interface ProductList{
    id: number,
    productName: string,
    productCategory1s: string,
    productCategory2: string,
    productDescription: string,
    productSoldType : string,
    productAmount : number
}
