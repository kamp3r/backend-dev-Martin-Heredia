import express from 'express';
import cors from 'cors'
import routerApi from './routes/index.Routes.js';
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


routerApi(app)

const server = app.listen(PORT, () => {
  console.log(`Server ejecutándose en el puerto ${PORT}`);
});

server.on('error', (error) => {
  console.log(error);
});
