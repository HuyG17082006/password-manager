import db from '../config/db.js';

const get = async (userId) => {

    return await db.execute(`
        SELECT
            id,
            name,
            totalAccounts,
            createdAt,
            updatedAt,
            isPinned
        FROM folders
        WHERE userId = ?
            AND isDeleted = false
        ORDER BY isPinned DESC, createdAt ASC
    `, [userId]);

}

const checkValidFolder = async (userId, id) => {

    const [result] = await db.execute(`
        SELECT 1 FROM folders WHERE userId = ? AND id = ? AND isDeleted = false`,
        [userId, id]
    )

    return result[0] || false;

}

const checkDuplicateName = async (userId, name) => {

    const [result] = await db.execute(`
        SELECT id FROM folders WHERE userId = ? AND name = ? LIMIT 1`,
        [userId, name]
    )

    return result[0] || false;

}

const create = async ({ id, userId, name, isPinned = false }) => {

    const [result] = await db.execute(
        `INSERT INTO folders (id, userId, name, isPinned) VALUES (?, ?, ?, ?)`,
        [id, userId, name, isPinned]
    );

    return result.insertId;
}

const deleteByUserIdAndFolderId = async (userId, folderId, { force = false }) => {

    if (force) {

        const [result] = await db.execute(
            `DELETE FROM folders WHERE userId = ? AND id = ? AND isDeleted = true`,
            [userId, folderId]
        );
        return result.affectedRows > 0;
    }

    const [result] = await db.execute(`
        UPDATE folders SET isDeleted = true WHERE userId = ? AND id = ? AND isDeleted = false`,
        [userId, folderId]
    )

    return result.affectedRows > 0;
}

const update = async (userId, folderId, { name = '', increase = false } = {}) => {

    let result = []

    if (increase) {
        [result] = await db.execute(`
            UPDATE folders SET totalAccounts = totalAccounts + 1
            WHERE userId = ? AND id = ?`,
            [userId, folderId]);
    
        }
    
    if (name) {
        [result] = await db.execute(`
            UPDATE folders SET name = ?
            WHERE userId = ? AND folderId = ?`,
            [name, userId, folderId])
        }

    return result.affectedRows > 0;
}

export default {
    get,
    
    create,
    
    deleteByUserIdAndFolderId,
    
    update,

    checkValidFolder,
    checkDuplicateName
}