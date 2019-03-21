"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataHandler_1 = __importDefault(require("../handler/dataHandler"));
const dataHandler = new dataHandler_1.default();
const router = express_1.default.Router();
router.post("/login", (req, res) => {
});
router.post("/register", (req, res) => {
});
router.post("/buy", (req, res) => {
    const token = req.body.token;
    if (!token) {
        res.json({
            message: "Invalid Token"
        });
    }
    else {
        console.log("You bought something");
    }
});
router.get("/getItems", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield dataHandler.getItems());
}));
router.post("/getOrders", (req, res) => {
});
exports.default = router;
