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




