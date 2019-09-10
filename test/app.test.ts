import request from "supertest";
import app from "../src/app";

describe("GET /random-url", () => {
    test("should return 404 OK", async (done) => {
        const result = await request(app).get("/reset");
        expect(result.status).toBe(404);
        done();
    });
});

describe("GET /", () => {
    test("should return 'Hello World!'", async (done) => {
        const result = await request(app).get("/");
        expect(result.status).toBe(200);
        expect(result.text).toBe("Hello World!");
        done();
    });
});

describe("POST /", () => {
    test("should return the request object", async (done) => {
        const reqObj = { hello: "world" };
        const result = await request(app).post("/").send(reqObj);
        expect(result.status).toBe(200);
        expect(result.body).toStrictEqual(reqObj);
        done();
    });
});
