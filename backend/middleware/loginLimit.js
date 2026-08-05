import limit from "../utils/limit.js";

import { FIFTEEN_MINUTES } from "../constants/limit.constants.js";

export default async (req, res, next) => {
    const { ip } = req.client;
    const { username = '' } = req.body || {};

    await limit(`login:${ip}`, FIFTEEN_MINUTES.in_seconds, 20, `Vui lòng thử lại sau ${FIFTEEN_MINUTES.in_minutes} phút`);

    if (!username)
        return next();

    await limit(`login:username:${username}`, FIFTEEN_MINUTES.in_seconds, 5, `Vui lòng thử lại sau ${FIFTEEN_MINUTES.in_minutes} phút`);
    
    next();
}