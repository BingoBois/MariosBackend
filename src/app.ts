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

app.listen(3001, () => {
    console.log("Server is running at port 3001");
});
