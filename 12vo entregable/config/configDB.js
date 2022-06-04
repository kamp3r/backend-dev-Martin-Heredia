import yargs from 'yargs';
import {hideBin} from 'yargs/helpers'
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import session from 'express-session';

const connectSession = (app) => {
  app.use(
    session({
      secret: String(process.env.SECRET),
      store: new MongoStore({ client: mongoose.connection.getClient() }),
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      name: String(process.env.COOKIENAME),
    })
  );
};

const { PORT } = yargs(hideBin(process.argv.slice(2))).alias({
  p: 'PORT'
}).default({
  PORT: 8080,
}).argv


export { connectSession, PORT };
