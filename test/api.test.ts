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

describe("GET /api", () => {
    test("should return 200 OK", async (done) => {
        const result = await request(app).get("/api").set('Authorization', `Bearer ${token}`);
        expect(result.status).toBe(200);
        done();
    });

    test("should return 403 Forbidden", async (done) => {
        const result = await request(app).get("/api");
        expect(result.status).toBe(403);
        done();
    });
});
