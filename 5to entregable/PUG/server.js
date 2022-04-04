const express = require('express')
const PORT = 8080 || process.env.PORT;
const routerApi = require('./routes/index.js')
const app = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routerApi(app)

//Views & Template Engine
app.set('views', './views');
app.set('view engine', 'pug');

app.listen(PORT, () => console.log(`Servidor funcionando correctamente en el puerto: ${PORT}`))