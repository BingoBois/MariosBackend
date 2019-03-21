export interface Item{
    id?: number;
    itemName: string;
    itemDescription: string;
    price: number;
}

export interface User{
	email: string;
    password: string;
    token?: string;
    id?: number;
}

export interface FoodOrder{
    id?: number;
    cost: number;
    itemId?: number;
}

export interface token{
    [token: string] : number;
}

interface IFoodOrder {
    name: string;
    phone: string;
    order: Item[]
}