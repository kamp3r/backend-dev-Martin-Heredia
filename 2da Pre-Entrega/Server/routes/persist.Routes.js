import { Router } from "express";
import 'dotenv/config';
import configDB from "../config/configDB.js";

const persistRoute = Router();

const changeDB = (db)=>{
    process.env.DB = db;
}

persistRoute.get("/", async (req, res) => {
    res.json(configDB.DBSwitch)
})

persistRoute.post("/", async (req, res) => {
    changeDB(req.body.persist);
})

export default persistRoute