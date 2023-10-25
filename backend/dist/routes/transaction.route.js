"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionRoutes = express_1.default.Router();
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
transactionRoutes.get("/", transaction_controller_1.default.findAll);
transactionRoutes.post("/", transaction_controller_1.default.post);
transactionRoutes.put("/:id", transaction_controller_1.default.put);
transactionRoutes.delete("/:id", transaction_controller_1.default.deleteTransaction);
exports.default = transactionRoutes;
