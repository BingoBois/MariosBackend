# MariosBackend

Made by:
 - Chris Rosendorf
 - Vikto Kim Christiansen
 - William Pfaffe

### Installation

- Clone Repository
- Ensure NodeJS is installed and working on system
- Install the dependencies by running: `npm i` in the root directory
- Ensure TypeScript is globally installed through npm: `npm i -g typescript`
- Open 1 terminal in root directory of the project, then run `tsc -w` (Leave it open the whole time)
- Open another terminal and run the command: `npm start`

### TDD
The project was written using an interface, and implementing tests based on that interface. You can check the tests out in `test.test.ts`, where they are implemented based on the description given in the project assignment.

The pizzaria wanted the following features:

 - Admin Login
 - Customer Creates orders
 - Admin be able to view orders and update their status
 - Customers being able to view all items available

 The only thing that changed constantly, was the input or output needed, since the backend and frontend were created at seperate times, mostly in order to forfill the needs of the frontend.

### Documentation
The following API's are available

[GET]/api/getItems
returns the following JSON data
```
[
    {
        id?: number;
        itemName: string;
        itemDescription: string;
        price: number;
    }
]
```

[POST]/api/login
Takes the following data
```
{
    email: "test@test.dk",
    password: "password"
}
```

and returns the following: 
```
{
	email: string;
    password: string;
    token?: string;
    id?: number;
}
```

[POST]/api/getOrders
Takes the following data
```
{
    token: "INSERT TOKEN GIVEN FROM USER LOGIN"
}
```

returns the following: 
```
{
    [
        name: string;
        phone: string;
        order: Item[]
    ],
}
```

[POST]/api/createOrder
Takes the following:
{
    name: "Vikto",
    phone: "8585858",
    items: Item[]
}

returns the following: 
```
{
    success: boolean,
    error: null || error message
}
```