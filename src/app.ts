import bodyParser from "body-parser";
import express from "express";
import DataHandler from './handler/dataHandler'
import cors from 'cors';
const app = express();
app.use(bodyParser.json());
app.use(cors());

import PizzaRoute from "./routes/pizzaRoute";
app.use("/api", PizzaRoute);

const dataHandler = new DataHandler();

async function sut(){
    const user = await dataHandler.login("vikto@live.com", "sutmig");
    if(user.token)
        console.log(await dataHandler.getOrders(user.token));

}


sut();

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
