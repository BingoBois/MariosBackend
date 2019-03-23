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
const dataHandler_1 = __importDefault(require("../handler/dataHandler"));
const dataHandler = new dataHandler_1.default();
afterAll(() => {
    dataHandler.closeConnection();
});
describe('Marios Pizza Tests', () => {
    test('Throw an error when user does not exist', (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const login = yield dataHandler.login("vikto@sutter", "1234");
        }
        catch (error) {
            expect(error).toEqual("No such user");
        }
        finally {
            done();
        }
    }));
    test('Throw an error when login email format is wrong', (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const login = yield dataHandler.login("vikto sutter", "1234");
        }
        catch (error) {
            expect(error).toEqual("Email must be valid");
        }
        finally {
            done();
        }
    }));
    test('Throw an error when register email format is wrong', (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const login = yield dataHandler.register({ email: "du er maskin", password: "ih no" });
        }
        catch (error) {
            expect(error).toEqual("Email must be valid");
        }
        finally {
            done();
        }
    }));
    test("Trying to get orders while not being granted", (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield dataHandler.getOrders("sutmig");
        }
        catch (err) {
            expect(err).toEqual("Invalid Token");
        }
        finally {
            done();
        }
    }));
    test("Successfully getting orders", (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield dataHandler.login("vikto@live.com", "sutmig");
            if (user.token) {
                const orders = yield dataHandler.getOrders(user.token);
            }
        }
        catch (err) {
            expect(err).toEqual(null);
        }
        finally {
            done();
        }
    }));
    test("Successfully getting orders", (done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield dataHandler.login("vikto@live.com", "sutmig");
            if (user.token) {
                const orders = yield dataHandler.getOrders(user.token);
                expect(orders.length).toBeGreaterThan(0);
            }
        }
        catch (err) {
        }
        finally {
            done();
        }
    }));
    test("Verify that orders can be created", (done) => __awaiter(this, void 0, void 0, function* () {
        expect(yield dataHandler.createOrder("vikto@live.com", [1, 2, 1, 2])).toEqual(true);
    }));
});
