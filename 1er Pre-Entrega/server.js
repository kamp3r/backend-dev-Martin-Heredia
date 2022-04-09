import express from "express";
import routerApi from "./routes/index.js";
const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routerApi(app)


app.listen(PORT, () => console.log(`Servidor funcionando correctamente en el puerto: ${PORT}`))