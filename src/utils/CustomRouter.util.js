import { Router } from "express";
import jwt from "jsonwebtoken"
import { readById } from "../data/mongo/managers/users.manager.js";

class CustomRouter {
    constructor() {
        this._router = Router();
    }
    getRouter = () => this._router
    applyCallbacks = (callbacks) => callbacks.map(cb => async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    responses = (req, res, next) => {
        res.json200 = (response, message) => res.status(200).json({ response, message });
        res.json201 = (response, message) => res.status(201).json({ response, message });
        res.json400 = (message) => res.status(400).json({ error: message });
        res.json401 = () => res.status(401).json({ error: "Bad Auth!" });
        res.json403 = () => res.status(403).json({ error: "Forbidden!" });
        res.json404 = () => res.status(404).json({ error: "Not found!" });
        return next();
    };

    policies = (pol) => async (req, res, next) => {
        try {
            if (pol.includes("PUBLIC")) return next();
            const token = req?.cookies?.token;
            if (!token) return res.json401();
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const { role, user_id } = data;
            if (!role || !user_id) return res.json401();
            if (
                (pol.includes("USER") && role === "USER") ||
                (pol.includes("ADMIN") && role === "ADMIN")
            ) {
                const user = await readById(user_id);
                if (!user) return res.json401();
                req.user = user;
                return next();
            }
            return res.json403();
        } catch (error) {
            return res.json400(error.message);
        }
    };

    create = (path, pol, ...callbacks) => this._router.post(path, this.responses, this.policies(pol), this.applyCallbacks(callbacks))
    read = (path, pol, ...callbacks) => this._router.get(path, this.responses, this.policies(pol), this.applyCallbacks(callbacks))
    update = (path, pol, ...callbacks) => this._router.put(path, this.responses, this.policies(pol), this.applyCallbacks(callbacks))
    destroy = (path, pol, ...callbacks) => this._router.delete(path, this.responses, this.policies(pol), this.applyCallbacks(callbacks))
    use = (path, pol, ...callbacks) => this._router.use(path, this.responses, this.policies(pol), this.applyCallbacks(callbacks))
}

export default CustomRouter;