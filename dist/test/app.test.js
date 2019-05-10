"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe("GET /random-url", () => {
    it("should return 404", (done) => {
        supertest_1.default(app_1.default).get("/reset").expect(404, done);
    });
});
