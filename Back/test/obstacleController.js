const httpMocks = require("node-mocks-http");
const { addObstacle, getAllObstacles, getObstacleById, updateObstacle, deleteObstacle } = require("../controllers/obstacleController");

describe("Obstacle Controller", () => {
    describe("Add Obstacle", () => {
        it("should create a new obstacle", async () => {
            const obstacle = {
                name: "Wall",
                image: "wall.jpg",
                type: "solid",
                through: false,
                description: "A solid obstacle",
                speed: null,
            };
            const req = httpMocks.createRequest({ body: obstacle });
            const res = httpMocks.createResponse();
            await addObstacle(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toBe("Obstacle ajouté avec succès !");
        });
    });

    describe("Get All Obstacles", () => {
        it("should return all obstacles", async () => {
            const req = httpMocks.createRequest({});
            const res = httpMocks.createResponse();
            await getAllObstacles(req, res);
            expect(res.statusCode).toBe(200);
        });
    });

    describe("Get Obstacle By Id", () => {
        it("should return an obstacle by ID", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            await getObstacleById(req, res);
            expect(res.statusCode).toBe(200);
        });
        it("should return a 404 error for non-existent obstacle", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            await getObstacleById(req, res);
            expect(res.statusCode).toBe(404);
        });
    });

    describe("Update Obstacle", () => {
        it("should update an obstacle", async () => {
            const obstacleUpdate = {
                name: "Updated Wall",
                image: "updated_wall.jpg",
                type: "solid",
                through: false,
                description: "An updated solid obstacle",
                speed: null,
            };
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                },
                body: obstacleUpdate
            });
            const res = httpMocks.createResponse();
            await updateObstacle(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toBe("Obstacle mis à jour avec succès !");
        });
        it("should return a 404 error for non-existent obstacle", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                },
                body: {
                    name: "Updated Wall",
                    image: "updated_wall.jpg",
                    type: "solid",
                    through: false,
                    description: "An updated solid obstacle",
                    speed: null,
                }
            });
            const res = httpMocks.createResponse();
            await updateObstacle(req, res);
            expect(res.statusCode).toBe(404);
        });
    });

    describe("Delete Obstacle", () => {
        it("should delete an obstacle", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: 1
                }
            });
            const res = httpMocks.createResponse();
            await deleteObstacle(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getData()).toBe("Obstacle supprimé avec succès !");
        });
        it("should return a 404 error for non-existent obstacle", async () => {
            const req = httpMocks.createRequest({
                params: {
                    id: -1
                }
            });
            const res = httpMocks.createResponse();
            await deleteObstacle(req, res);
            expect(res.statusCode).toBe(404);
        });
    });
});
