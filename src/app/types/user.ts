import { Item } from "./item";

export interface User {
    email: string,
    username: string,
    tel: string,
    cart: Item[]
}