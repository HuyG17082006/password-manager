import db from "../config/db.js";
import appError from "../errors/appError.js";

export default async (actions = []) => {

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        for (const fn of actions) {

            if (typeof fn !== 'function')
                throw appError({
                    code: 500,
                    message: "SERVER ERROR"
                })

            await fn(conn);

        }

        await conn.commit();

    } catch (err) {

        await conn.rollback();
        throw err;

    } finally {

        conn.release();

    }

}