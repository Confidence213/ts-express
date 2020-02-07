import request from "supertest";
import app from "../src/app";

let token: string;

beforeAll((done) => {
    request(app)
        .post('/login')
        .send({
            password: 'password',
            username: 'admin'
        })
        .end((err, response) => {
            token = response.body.token;
            done();
        });
});

describe("GET /random-url", () => {
    test("should return 404 OK", async (done) => {
        const result = await request(app).get("/reset").set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(404);
        done();
    });
});

describe("GET /", () => {
    test("should return 'Hello World!'", async (done) => {
        const result = await request(app).get("/").set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.text).toBe("Hello World!");
        done();
    });
});

describe("POST /", () => {
    test("should return the request object", async (done) => {
        const reqObj = { hello: "world" };
        const result = await request(app).post("/").set('Authorization', `Bearer ${token}`).send(reqObj);
        expect(result.status).toBe(200);
        expect(result.body).toStrictEqual(reqObj);
        done();
    });
});
