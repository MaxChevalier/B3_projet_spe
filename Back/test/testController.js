const httpMocks = require("node-mocks-http");
const { addTest, getAllTests, getTestById, updateTest, deleteTest } = require("../controllers/testController");

describe("Test Controller", () => {
    describe("Add Test", () => {
        it("should create a new test", async () => {
            const test = {
                id_level: 1,
                date: "2024-05-12",
                score: 85,
            };
            const req = httpMocks.createRequest({ body: test });
            const res = httpMocks.createResponse();
            await addTest(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toHaveProperty("id_level", test.id_level);
            expect(res._getData()).toHaveProperty("date", test.date);
            expect(res._getData()).toHaveProperty("score", test.score);
        });
    });

    describe("Get All Tests", () => {
        it("should return all tests", async () => {
            const req = httpMocks.createRequest({});
            const res = httpMocks.createResponse();
            await getAllTests(req, res);
            expect(res.statusCode).toBe(200);
        });
    });

    describe("Get Test By Id", () => {
        it("should return a test by ID", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            await getTestById(req, res);
            expect(res.statusCode).toBe(200);
        });
        it("should return a 404 error for non-existent test", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            await getTestById(req, res);
            expect(res.statusCode).toBe(404);
        });
    });

    describe("Update Test", () => {
        it("should update a test", async () => {
            const testUpdate = {
                id_level: 2,
                date: "2024-05-15",
                score: 90,
            };
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                },
                body: testUpdate
            });
            const res = httpMocks.createResponse();
            await updateTest(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toHaveProperty("id_level", testUpdate.id_level);
            expect(res._getData()).toHaveProperty("date", testUpdate.date);
            expect(res._getData()).toHaveProperty("score", testUpdate.score);
        });
        it("should return a 404 error for non-existent test", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                },
                body: {
                    id_level: 2,
                    date: "2024-05-15",
                    score: 90,
                }
            });
            const res = httpMocks.createResponse();
            await updateTest(req, res);
            expect(res.statusCode).toBe(404);
        });
    });

    describe("Delete Test", () => {
        it("should delete a test", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            await deleteTest(req, res);
            expect(res.statusCode).toBe(200);
        });
        it("should return a 404 error for non-existent test", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            await deleteTest(req, res);
            expect(res.statusCode).toBe(404);
        });
    });
});
