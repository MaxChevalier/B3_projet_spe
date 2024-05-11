const httpMocks = require("node-mocks-http");
const { addUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");


describe("User Controller", () => {
    describe("Add User", () => {

        it("should create a new user", async () => {
            const user = {
                name: "newtesters",
                email: "nestester@test.test",
                password: "testpass",
            };
            const res = httpMocks.createResponse();
            const response = await addUser({ body: user }, res);
            expect(response.statusCode).toBe(201);
        });

        it("should return 400 if request body is invalid", async () => {
            const users = {
                name: "newtesters",
                email: "nestester@test.test",
            };
            const res = httpMocks.createResponse();
            const response = await addUser({ body: users }, res);
            expect(response.statusCode).toBe(400);
        });

        it("should return 409 if email already exists", async () => {
            const user = {
                name: "newtesters",
                email: "nestester@test.test",
                password: "testpass",
            };
            const res = httpMocks.createResponse();
            const response = await addUser({ body: user }, res);
            expect(response.statusCode).toBe(409);
        });

    });

    describe("Get All User", () => {
        it("should return a user", async () => {
            const req = httpMocks.createRequest({});
            const res = httpMocks.createResponse();
            const response = await getAllUsers(req, res);
            expect(response.statusCode).toBe(200);
        });
    });

    describe("Get User By Id", () => {
        it("should return a user", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            const response = await getUserById(req, res);
            expect(response.statusCode).toBe(200);
        });
        it("should return a 404 error", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            const response = await getUserById(req, res);
            expect(response.statusCode).toBe(404);
        });
        it("should return a 400 error", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: null
                }
            });
            const res = httpMocks.createResponse();
            const response = await getUserById(req, res);
            expect(response.statusCode).toBe(400);
        });
    });

    describe("Update User", () => {
        it("should update a user", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                },
                body: {
                    name: "testers",
                    email: "tester@test.test",
                    password: "testpass",
                }
            });
            const res = httpMocks.createResponse();
            const response = await updateUser(req, res);
            expect(response.statusCode).toBe(200);
        });
        it("should return a 404 error", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                },
                body: {
                    name: "testers",
                    email: "tester@test.test",
                    password: "testpass",
                }
            });
            const res = httpMocks.createResponse();
            const response = await updateUser(req, res);
            expect(response.statusCode).toBe(404);
        });
        it("should return a 400 error if not correct body", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                },
                body: {
                    name: "testers",
                }
            });
            const res = httpMocks.createResponse();
            const response = await updateUser(req, res);
            expect(response.statusCode).toBe(400);
        });
        it("should return a 400 error if no id", async () => {
            const req = httpMocks.createRequest({
                body: {
                    name: "testers",
                    email: "tester@test.test",
                    password: "testpass",
                }
            });
            const res = httpMocks.createResponse();
            const response = await updateUser(req, res);
            expect(response.statusCode).toBe(400);
        });
    });

    describe("Delete User", () => {
        it("should delete a user", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            const response = await deleteUser(req, res);
            expect(response.statusCode).toBe(200);
        });
        it("should return a 404 error", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            const response = await deleteUser(req, res);
            expect(response.statusCode).toBe(404);
        });
        it("should return a 400 error", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: null
                }
            });
            const res = httpMocks.createResponse();
            const response = await deleteUser(req, res);
            expect(response.statusCode).toBe(400);
        });
    });
});