import express from 'express';
import DataHandler from '../handler/dataHandler'
const dataHandler = new DataHandler();

const router = express.Router();



router.post("/login", (req, res) => {
    
})

router.post("/register", (req, res) => {
    
})

router.post("/buy", (req, res) => {
    const token = req.body.token;
    if(!token){
        res.json({
            message: "Invalid Token"
        })    
    }else{
        console.log("You bought something");
    }
})

router.get("/getItems", async (req, res) => {
    res.json(await dataHandler.getItems())
})

router.post("/getOrders", (req, res) => {
    
})

export default router;