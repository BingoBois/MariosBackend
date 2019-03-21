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
const mysql_1 = __importDefault(require("mysql"));
const crypto_1 = __importDefault(require("crypto"));
class DataHandler {
    constructor() {
        this.userTokens = {};
        var serverIP = "45.76.91.135";
        var user = "sammy";
        var password = "password";
        var db = "test08";
        this.connection = mysql_1.default.createConnection({
            host: serverIP,
            user: user,
            password: password,
            database: db
        });
        console.log("Successfully connected to db");
        this.connection.connect();
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!user.email.includes("@")) {
                    reject("Email must be valid");
                }
                else {
                }
            });
        });
    }
    login(email, password) {
        return new Promise((resolve, reject) => {
            if (!email.includes("@")) {
                reject("Email must be valid");
            }
            else {
                this.connection.query(`select id from user where email=? AND password=?`, [email, password], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(err);
                    else {
                        if (result.length <= 0) {
                            reject("No such user");
                        }
                        else {
                            const token = this.generateToken(email);
                            this.userTokens[token] = result[0];
                            resolve({ email: email, id: result[0].id, password: password, token });
                        }
                    }
                }));
            }
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.query(`select * from item`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(err);
                    else {
                        resolve(JSON.parse(JSON.stringify(result)));
                    }
                }));
            });
        });
    }
    createOrder(phone, name, foodList) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let insertString = `insert into foodOrder (itemIds, customerPhone, customerName) VALUES (${foodList.join(";")}, ${phone}, ${name});`;
                this.connection.query(insertString, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(err);
                    else {
                        resolve(true);
                    }
                }));
            });
        });
    }
    getSpecificFood(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.query(`select * from item where id = ${id}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(err);
                    else {
                        resolve(JSON.parse(JSON.stringify(result[0])));
                    }
                }));
            });
        });
    }
    getOrders(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this.userTokens[token]) {
                    reject("Invalid Token");
                }
                else {
                    this.connection.query(`select * from foodOrder`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            reject(err);
                        else {
                            let foodArr = [];
                            result[1].itemIds.split(";").forEach((foodElement) => __awaiter(this, void 0, void 0, function* () {
                                foodArr.push(yield this.getSpecificFood(foodElement));
                            }));
                            setInterval(() => {
                                resolve([{
                                        name: result[0].customerName,
                                        phone: result[0].customerPhone,
                                        order: foodArr
                                    }]);
                            }, 200);
                        }
                    }));
                }
            });
        });
    }
    deleteOrder(token, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.query(`delete from foodOrder where id = ${orderId}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(err);
                    else {
                        resolve(true);
                    }
                }));
            });
        });
    }
    closeConnection() {
        this.connection.destroy();
    }
    generateToken(email) {
        const secret = 'maskin';
        const hash = crypto_1.default.createHmac('sha256', secret)
            .update(email)
            .digest('hex');
        return hash;
    }
}
exports.default = DataHandler;
