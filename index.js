import express from "express";
import bodyParser from "body-parser";
import { connect } from "./src/config/database.js";
import apiRoute from "./src/routes/index.js"
import cors from "cors"
import passport from "passport";
import { passportAuth } from "./src/config/jwt-middleware.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    exposedHeaders:['X-Total-Count']
}
))
app.get('/',(req,res)=>{
    res.json({status:'sucess'})
})
app.use(passport.initialize());
passportAuth(passport)
app.use('/api',apiRoute);

app.listen(8080,  async ()=>{ 
    console.log("server started at 8080");
    await connect();
    console.log("MongoDB connected");
    console.log("Server started");
});