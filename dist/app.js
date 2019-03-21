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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dataHandler_1 = __importDefault(require("./handler/dataHandler"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
const pizzaRoute_1 = __importDefault(require("./routes/pizzaRoute"));
app.use("/api", pizzaRoute_1.default);
const dataHandler = new dataHandler_1.default();
function sut() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield dataHandler.login("vikto@live.com", "sutmig");
        if (user.token)
            console.log(yield dataHandler.getOrders(user.token));
    });
}
sut();
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
