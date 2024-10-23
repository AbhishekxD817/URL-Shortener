import express from "express";
import "dotenv/config";
import connectDb from './utils/db.js'
import urlRouter from "./routers/urlRouter.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send("<h1>Hello Abhishek</h1>");
})


app.use("/url", urlRouter);


app.all("*",(req,res,next)=>{
    return res.status(404).json({
        message:"NOT FOUND"
    })
})

app.listen(process.env.PORT, async () => {
    console.log("Server started => http://localhost:" + process.env.PORT);
    await connectDb();
})

