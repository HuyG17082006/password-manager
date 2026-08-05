import db from "../config/db.js";
import { REFRESH_TOKEN } from "../constants/token.constants.js";

const create = async (id, userId, refreshTokenHash, conn = db) => {
    const [result] = await conn.execute(`
        INSERT INTO refreshTokens
        (id, userId, refreshTokenHash, expiredAt)
        VALUES (?,?,?, NOW() + INTERVAL ${REFRESH_TOKEN.expired.mysql})`,
        [ id, userId, refreshTokenHash]
    );

    return result.affectedRows > 0;
}

const checkValid = async (refreshTokenId, conn = db) => {
    const [result] = await conn.execute(`
        SELECT userId, refreshTokenHash FROM refreshTokens WHERE id = ? AND expiredAt > NOW() LIMIT 1`,
        [refreshTokenId]
    )

    return result[0] || null;
}

const rotate = async (refreshTokenId, newRefreshTokenHash, conn = db) => {
    const [result] = await conn.execute(`
        UPDATE refreshTokens 
        SET refreshTokenHash = ?, expiredAt = NOW() + INTERVAL ${REFRESH_TOKEN.expired.mysql} 
        WHERE id = ? AND expiredAt > NOW() LIMIT 1`,
        [newRefreshTokenHash, refreshTokenId]
    )

    return result.affectedRows > 0
}

export default {
    create,

    checkValid,

    rotate
}