import "dotenv/config.js"
import express from "express"
import morgan from "morgan"
import handlebars from 'express-handlebars';
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import indexRouter from "./src/routers/index.routers.js"
import dbConnect from "./src/utils/dbConnect.util.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo";
import cors from "cors"

// server
const server = express()
const port = process.env.PORT
const ready = ()=> {
    console.log("server ready on port "+port);
    dbConnect()
}
server.listen(port, ready)

/*Configurar CORS
server.use(cors({
    origin: 'http://localhost:9000', // Permite solicitudes desde esta URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  // Habilitar el uso de cookies y credenciales
}));
*/
// engines
/*
server.engine('handlebars', handlebars.engine({
    helpers: {
        eq: (a, b) => a === b // Helper para comparar dos valores
    }
}));
server.set('view engine', 'handlebars');
server.set('views', './src/views'); 
*/
server.use(express.static("public"))
// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser(process.env.SECRET_KEY));
// configuración de session con memory
// server.use(session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true, cookie: { maxAge: 60000 } }))
// configuración de session con file storage
// const FileStore = sessionFileStore(session)
// server.use(session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true, store: new FileStore({ path: "./src/data/fs/sessions", ttl: 10, retries: 2 })}))
// configuración de session con mongo storage
server.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: process.env.DATABASE_URI,
        ttl: 60*60*24 // 1 day (60 segundos por 60 minutos por 24 horas) eso va a durar la session 
    }),
}))

// routers
server.use(indexRouter)
server.use(errorHandler)
server.use(pathHandler)


/*
FORMA DE LEVANTAR EL SERVIDOR POR EL PROFE CARLOS PERREN

import express from 'express';
import handlebars from 'express-handlebars';
import initSocket from './sockets.js';
import mongoose from 'mongoose';

import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

import viewsRouter from './routes/views.router.js';
import config from './config.js';


const app = express();



// Asignamos la instancia de la aplicación devuelta por el listen a una constante
const httpServer = app.listen(config.PORT, async () => {
    await mongoose.connect(config.DATABASE_URI);

    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine({
        helpers: {
            eq: (a, b) => a === b // Helper para comparar dos valores
        }
    }));

    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');
    app.use('/views', viewsRouter);

    app.use('/api/users', usersRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);

    app.use('/static', express.static(`${config.DIRNAME}/public`));

    console.log(`Server activo en puerto ${config.PORT} conectado a la base de datos ${config.DATABASE_URI_LOCAL}`);
});

*/