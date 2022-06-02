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
        maxAge: 60000
      },
      name: 'session.mongoDB'
    })
  );
};



export { connectSession };
