import redis from "../config/redis.js";
import appError from "../errors/appError.js";

export default async (key, time, maxAttempts, errorMessage) => {

    const count = await redis.incr(key);

    if (count === 1)
        await redis.expire(key, time);

    if (count > maxAttempts)
        throw appError(
            { code: 429, message: "TOO MANY REQUEST" },
            { error: errorMessage }
        );
};