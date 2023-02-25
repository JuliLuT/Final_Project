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
    price:string,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number
}
export interface cart{
    name:string,
    price:string,
    category:string,
    description:string,
    image:string,
    id:number|undefined,
    quantity:undefined|number,
    productId:number,
    userId:number
}