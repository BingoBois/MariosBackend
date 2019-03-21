import mysql, { Connection } from 'mysql';
import { User, FoodOrder, Item, token } from '../types/pizzaTypes'
import crypto from 'crypto'

export default class DataHandler {
    private connection: Connection;
    public userTokens: token = {};

    constructor() {
        var serverIP = "45.76.91.135";
        var user = "sammy";
        var password = "password";
        var db = "test08";
        this.connection = mysql.createConnection({
            host: serverIP,
            user: user,
            password: password,
            database: db
        });
        console.log("Successfully connected to db");
        this.connection.connect();
    }

    public async register(user: User): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!user.email.includes("@")) {
                reject("Email must be valid");
            } else {

            }
        })
    }

    public login(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            if (!email.includes("@")) {
                reject("Email must be valid");
            } else {
                this.connection.query(`select id from user where email=? AND password=?`, [email, password], async (err, result) => {
                    if (err) reject(err)
                    else {
                        if (result.length <= 0) {
                            reject("No such user")
                        } else {
                            this.userTokens[this.generateToken(email)] = result[0];
                            resolve({ email: email, id: result[0], password: password });
                        }
                    }
                });
            }
        })
    }

    public async buy(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                reject("Connection is empty!")
            }
        })
    }

    public async getItems(): Promise<Item[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from item`, async (err, result) => {
                if (err) reject(err)
                else {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
            });
        })
    }

    public async getOrders(): Promise<FoodOrder[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from foodOrder`, async (err, result) => {
                if (err) reject(err)
                else {
                    resolve(JSON.parse(JSON.stringify(result)));
                }
            });
        })
    }

    public closeConnection(): void {
        this.connection.destroy();
    }

    generateToken(email: string): string {
        const secret = 'maskin';
        const hash = crypto.createHmac('sha256', secret)
            .update(email)
            .digest('hex');
        return hash;
    }

}