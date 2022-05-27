import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import session from "express-session"

const connectSession = (app)=>{
    app.use(session({
        store: MongoStore({
            mongoUrl: process.env.MONGO_URL
        }),
        secret: String(process.env.SECRET),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    }))
}

export { connectSession }