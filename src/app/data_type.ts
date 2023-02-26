export interface signUp{
    name:string,
    email:string,
    password:string,
}
export interface logIn{
    email:string,
    password:string,
    id:number
}
export interface product{
    name:string,
    price:number,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number,
    productId:undefined|number
}
export interface cart{
    name:string,
    price:number,
    category:string,
    description:string,
    image:string,
    id:number|undefined,
    quantity:undefined|number,
    productId:number,
    userId:number
}
export interface priceSummary{
    price:number,
    total:number
}