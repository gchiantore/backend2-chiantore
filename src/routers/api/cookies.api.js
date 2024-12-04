import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/create", (req, res,next) => {
    try {
        const message = `COOKIES CREATED`;
        // para setear/crear una cookie necesito enviar el par clave/valor de la cookie en el objeto de respuesta con el metodo cookie
        // para la modificacion de una cookie, se sobre-escribe la misma con el mismo método de creación de cookie
        return res
            // envio codigo de estado
            .status(201)
            // envio una cookie con el par clave/valor de la cookie en el objeto de respuesta
            .cookie("mode","dark")
            // envio una cookie con el par clave/valor de la cookie en el objeto de respuesta con una ducacion en el tiempo
            .cookie("userRole","admin", {maxAge: 20000})
            // envio la respuesta
            .json({ message });
    } catch (error) {
        return next(error);
    }
});

cookiesRouter.get("/read", (req, res,next) => {
    try {
        const cookies = req.cookies
        console.log(cookies); // muestra todas las cookies
        console.log(cookies.mode);
        console.log(cookies["mode"]);
        const message = `COOKIES LISTED`;
        return res
            .status(200)
            .json({ message });
    } catch (error) {
        return next(error);
    }
});

cookiesRouter.get("/destroy/:cookieToDelete", (req, res,next) => {
    try {
        const { cookieToDelete } = req.params;  // destructuro el par clave/valor de la cookie a borrar
        const message = `COOKIE DELETED`;
        return res
            .status(200)
            .clearCookie(cookieToDelete)
            .json({ message });
    } catch (error) {
        return next(error);
    }
});

cookiesRouter.get("/signed", (req, res,next) => {
    try {
        const message = `COOKIES SIGNED CREATED`;
        return res
            .status(201)    
            .cookie("name","guille", {signed: true})
            .json({ message });
    } catch (error) {
        return next(error);
    }
});

cookiesRouter.get("/read-signed", (req, res,next) => {
    try {
        const cookies = req.cookies;
        const signedCookies = req.signedCookies;
        return res
            .status(200)
            .json({ cookies, signedCookies });
    } catch (error) {
        return next(error);
    }
});

export default cookiesRouter;
