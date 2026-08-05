import db from "../config/db.js";

const findValidRejectedByUserIdAndDeviceId = async (userId, deviceId, conn = db) => {
    const [result] = await conn.execute(`
        SELECT * FROM loginVerifications
        WHERE userId = ? AND deviceId = ? AND expiredAt < NOW() AND status = 'rejected'`,
        [userId, deviceId]
    );

    return result[0] || null;
}

const findById = async (id, conn = db) => {
    const [result] = await conn.execute(`
        SELECT * FROM loginVerifications
        WHERE id = ? LIMIT 1`,
        [id]
    );

    return result[0] || null;
}

const create = async (id, userId, deviceId, conn = db) => {
    const [result] = await conn.execute(`
        INSERT INTO loginVerifications
        (id, userId, deviceId, status, expiredAt)
        VALUES (?, ?, ?, "pending", NOW() + INTERVAL 15 MINUTE)`,
        [id, userId, deviceId]
    );

    return result.affectedRows > 0;
}

const updateStatus = async (id, status, { blockDevice = false } = {}, conn = db) => {
    const [result] = await conn.execute(`
        UPDATE loginVerifications                
        SET status = ? ${blockDevice ? "AND expiredAt = NOW() + INTERVAL 60 MINUTE" : ''}
        WHERE id = ? LIMIT 1`,
        [status, id]
    );

    return result.affectedRows > 0;
}

const updateConsumedAt = async (id, conn = db) => {
    const [result] = await conn.execute(`
        UPDATE loginVerifications SET consumedAt = NOW() WHERE id = ? AND consumedAt IS NULL AND status = 'accepted'`,
        [id]
    )

    return result.affectedRows > 0;
}

const deleteExpired = async () => {
    const [result] = await db.execute(`
        DELETE FROM loginVerifications
        WHERE expiredAt < NOW()`,
        []
    );

    return result.affectedRows > 0;
} 

const deleteById = async (id) => {
    const [result] = await db.execute(`
        DELETE FROM loginVerifications
        WHERE id = ? LIMIT 1`,
        [id]
    );

    return result.affectedRows > 0;
}

export default {
    create,

    updateStatus,
    updateConsumedAt,

    deleteById,
    deleteExpired,
    
    findValidRejectedByUserIdAndDeviceId,
    findById
}