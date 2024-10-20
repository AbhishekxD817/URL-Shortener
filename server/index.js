import express from "express";
import "dotenv/config";


const app = express();


app.get("/", (req, res, next) => {
    res.send("<h1>Hello Abhishek</h1>");
})

app.listen(process.env.PORT, () => {
    console.log("Server started => http://localhost:" + process.env.PORT);
})

