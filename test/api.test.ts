import request from "supertest";
import app from "../src/app";

describe("GET /api", () => {
    test("should return 200 OK", async (done) => {
        const result = await request(app).get("/api");
        expect(result.status).toBe(200);
        done();
    });
});
