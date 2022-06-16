const yargs =  require('yargs');
const {hideBin} =  require('yargs/helpers');
const MongoStore =  require('connect-mongo');
const session =  require('express-session');

const connectSession = (app) => {
  app.use(
    session({
      secret: String(process.env.SECRET),
      store: MongoStore.create({ mongoUrl: process.env.DB_URL, mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true} }),
      resave: true,
      rolling: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000,
      },
      name: String(process.env.COOKIENAME),
    })
  );
};

const { PORT } = yargs(hideBin(process.argv)).alias({
  p: 'PORT',
  c: 'CLUSTER'
}).default({
  PORT: process.argv[2] || 8080,
  CLUSTER: 'fork'
}).argv



module.exports = { connectSession, PORT };
