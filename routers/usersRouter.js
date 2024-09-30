const express = require("express");
const userController = require("../controllers/userController");
const app = express();


const userRouter = express.Router();

function requestLog(request) {
    console.log(new Date().toLocaleTimeString() + " || " + request.ip + " || (" + request.method + ") " + request.protocol + "://" + request.hostname + request.originalUrl);

}

userRouter.get("/", async function (request, response) {
    try {
        requestLog(request);
        const users = await userController.getAll();
        response.status(200).json(users);
    } catch (error) {
        console.log(new Date().toLocaleTimeString() + " || Error >> " + error );
        response.sendStatus(500)
    }
});

userRouter.get("/:id", async function (request, response) {
    try {
        requestLog(request);
        const user = await userController.getById(Number(request.params.id));
        response.status(200).json(user);
    } catch (error) {
        console.log(new Date().toLocaleTimeString() + " || Error >> " + error );
        response.sendStatus(500)
    }
});

userRouter.post("/", async function (request, response) {
    try {
        requestLog(request);
        const {email, name}  = request.body;
        
        await userController.create(email, name);
        response.sendStatus(200)
    } catch (error) {
        console.log(new Date().toLocaleTimeString() + " || Error >> " + error );
        response.sendStatus(500)
    }
});

userRouter.delete("/:id", async function (request, response) {
    try {
        requestLog(request);
        
        await userController.deleteById(Number(request.params.id));
        response.sendStatus(200)
    } catch (error) {
        console.log(new Date().toLocaleTimeString() + " || Error >> " + error );
        response.sendStatus(500)
    }
});

module.exports = userRouter;