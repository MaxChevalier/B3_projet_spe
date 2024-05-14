const httpMocks = require("node-mocks-http");
const { addLevel, getAllLevels, getLevelById, updateLevel, deleteLevel } = require("../controllers/levelController");

describe("Level Controller", () => {
    describe("Add Level", () => {
        it("should create a new level", async () => {
            const level = {
                name: "Level 1",
                creator: "John Doe",
                creation_date: "2024-05-12",
                modification_date: "2024-05-12",
                size_x: 10,
                size_y: 10,
                obstacles: {nb : 10, obstacles: 1},
                defaultObstacleId: 1,
                defaultLayout: "Grid"
            };
            const req = httpMocks.createRequest({ body: level });
            const res = httpMocks.createResponse();
            await addLevel(req, res);
            expect(res.statusCode).toBe(200);
        });
    });

    describe("Get All Levels", () => {
        it("should return all levels", async () => {
            const req = httpMocks.createRequest({});
            const res = httpMocks.createResponse();
            await getAllLevels(req, res);
            expect(res.statusCode).toBe(200);
        });
    });

    describe("Get Level By Id", () => {
        it("should return a level by ID", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            await getLevelById(req, res);
            expect(res.statusCode).toBe(200);
        });
        it("should return a 404 error for non-existent level", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            await getLevelById(req, res);
            expect(res.statusCode).toBe(404);
        });
    });

    describe("Update Level", () => {
        it("should update a level", async () => {
            const levelUpdate = {
                name: "Updated Level 1",
                creator: "Jane Doe",
                creation_date: "2024-05-15",
                modification_date: "2024-05-15",
                size_x: 15,
                size_y: 15,
                obstacles: {nb : 10, obstacles: 1},
                defaultObstacleId: 1,
                defaultLayout: "Random"
            };
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                },
                body: levelUpdate
            });
            const res = httpMocks.createResponse();
            await updateLevel(req, res);
            expect(res.statusCode).toBe(200);
        });
        it("should return a 404 error for non-existent level", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                },
                body: {
                    name: "Updated Level 1",
                    creator: "Jane Doe",
                    creation_date: "2024-05-15",
                    modification_date: "2024-05-15",
                    size_x: 15,
                    size_y: 15,
                    obstacles: {nb : 10, obstacles: 1},
                    defaultObstacleId: 1,
                    defaultLayout: "Random"
                }
            });
            const res = httpMocks.createResponse();
            await updateLevel(req, res);
            expect(res.statusCode).toBe(404);
        });
    });

    describe("Delete Level", () => {
        it("should delete a level", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            await deleteLevel(req, res);
            expect(res.statusCode).toBe(200);
        });
        it("should return a 404 error for non-existent level", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            await deleteLevel(req, res);
            expect(res.statusCode).toBe(404);
        });
    });
});
