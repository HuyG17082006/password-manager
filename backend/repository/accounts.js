import db from "../config/db.js";

const get = async (userId, folderId, { isNoFolder = false } = {}) => {

    let sql = `
        SELECT
            id,
            applicationName,
            username,
            email,
            owner,
            isPinned,
            createdAt,
            updatedAt,
            deletedAt
        FROM accounts
        WHERE userId = ? AND isDeleted = false
    `;

    const params = [userId];

    if (isNoFolder) {

        sql += ` AND folderId IS NULL `;

    } else if (folderId) {

        sql += ` AND folderId = ? `;
        params.push(folderId);

    }

    const data = await db.execute(sql, params);
    return data[0] || []
};

const getSystemFolderTotalAccount = async (userId, conn = db) => {

    const [rows] = await conn.execute(`
        SELECT

            COUNT(*) AS "all",

            SUM(
                CASE
                    WHEN folderId IS NULL THEN 1
                    ELSE 0
                END
            ) AS "no-folder",

            SUM(
                CASE
                    WHEN isPinned = TRUE THEN 1
                    ELSE 0
                END
            ) AS favorites

        FROM accounts

        WHERE
            userId = ?
            AND isDeleted = FALSE
    `, [userId]);

    return rows[0];
};


const getDetail = async (id, userId) => {

    const [result] = await db.execute(`SELECT * FROM accounts WHERE id = ? AND userId = ?`, [id, userId])

    return result[0] || null;

}

const updateIsPinned = async (userId, id, { status = false } = {}) => {

    const [result] = await db.execute(`
        UPDATE accounts SET isPinned = ? WHERE userId = ? AND id = ?`,
        [status, userId, id]
    )

    return result.affectedRows > 0;

}

const updateWhenFolderContainDeleted = async (folderId, conn = db) => {

    const [result] = await conn.execute(`
        UPDATE accounts 
        SET folderId = NULL
        WHERE folderId = ?`,
        [folderId]
    )

    return result.affectedRows > 0;

}

const create = async (
    id,
    userId,
    { applicationName, username, email, owner, note, url, passwordEncrypted, iv, authTag, folderId, isPinned = false } = {}
) => {

    if (folderId) {
        const [result] = await db.execute(
            `INSERT INTO accounts 
            (id, userId, folderId, owner, applicationName, username, email, note, url, passwordEncrypted, iv, authTag, isPinned) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, userId, folderId, owner, applicationName, username, email, note, url, passwordEncrypted, iv, authTag, isPinned]
        );

        return result.insertId;
    }

    const [result] = await db.execute(
        `INSERT INTO accounts 
        (id, userId, owner, applicationName, username, email, note, url, passwordEncrypted, iv, authTag, isPinned) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, userId, owner, applicationName, username, email, note, url, passwordEncrypted, iv, authTag, isPinned]
    );

    return result.insertId;
}


const deleteByIdAndUserId = async (id, userId, { force = false } = {}) => {

    if (force) {

        const [result] = await db.execute(
            `
            DELETE FROM accounts
            WHERE
                id = ?
                AND userId = ?
                AND isDeleted = TRUE
            `,
            [id, userId]
        );

        return result.affectedRows > 0;

    }

    const [result] = await db.execute(
        `
        UPDATE accounts
        SET
            isDeleted = TRUE,
            deletedAt = NOW()
        WHERE
            id = ?
            AND userId = ?
            AND isDeleted = FALSE
        `,
        [id, userId]
    );

    return result.affectedRows > 0;

};

export default {
    get,
    getDetail,
    getSystemFolderTotalAccount,

    updateIsPinned,
    updateWhenFolderContainDeleted,

    deleteByIdAndUserId,

    create
}