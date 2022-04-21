import express from "express";
import routerApi from "./routes/index.js";
import cors from 'cors';
const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


routerApi(app)



app.listen(PORT, () => console.log(`Servidor funcionando correctamente en el puerto: ${PORT}`))