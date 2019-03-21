export interface Item{
    id?: number;
    itemName: string;
    itemDescription: string;
    price: number;
}

export interface User{
    id?: number;
	email: string;
    password: string;
}

export interface FoodOrder{
    id?: number;
    cost: number;
    itemId?: number;
}

export interface token{
    [token: string] : number;
}