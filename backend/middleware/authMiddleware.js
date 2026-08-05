import jwt from "../utils/jwt.js"
import appError from "../errors/appError.js";

export default async (req, res, next) => {

    const token = req?.headers?.authorization?.split(' ')[1] || '';
    
    const payload = jwt.accessToken.verify(token);

    req.userId = payload.userId;

    next();

}