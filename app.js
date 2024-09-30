const express = require("express");
const usersRouter = require('./routers/usersRouter');

const app = express();

app.set('trust proxy', true)
app.use(express.json());
app.use("/users", usersRouter);


app.listen(5050, () => {
    console.log("App start on http://localhost:5050 ... ");
    console.log("Wait connections");
})
