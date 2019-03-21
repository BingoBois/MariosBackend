import express from 'express';
import DataHandler from '../handler/dataHandler'
let dataHandler = new DataHandler();

const router = express.Router();



router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username){
        res.json({
            success: false,
            error: "Missing username"
        })
    }

    if(!password){
        res.json({
            success: false,
            error: "Missing password"
        })
    }

    try{
        const loggedUser = await dataHandler.login(username, password);
        res.json(loggedUser);
    }catch(err){
        res.json({
            error: err,
            success: false
        })
    }
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

router.post("/getOrders", async (req, res) => {
    const token = req.body.token;
    if(dataHandler.userTokens[token]){
        res.json(await dataHandler.getOrders(token));
    }else{
        res.json({
            tropaadet: "sut"
        })
    }
})

export default router;