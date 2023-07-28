import { Item } from "./item";
import { UserDeliveryInfo } from "./user-delivery-info";

export interface User {
    email: string,
    username: string,
    tel: string,
    cart: Item[],
    deliveryInfo: UserDeliveryInfo,
    boughtItems: Item[]
}
