import db from "../config/db.js";

const getByText = async (userId, text) => {
    const sql = `
    SELECT
        f.id,
        'folder' AS type,

        f.name,
        f.name AS folderName,

        NULL AS applicationName,
        NULL AS username,
        NULL AS email

    FROM folders f

    WHERE
        f.userId = ?
        AND f.name LIKE ?

    UNION ALL

    SELECT
        a.id,
        'account' AS type,

        COALESCE(f.name, 'No Folder') AS folderName,

        a.applicationName,
        a.username,
        a.email,

        NULL AS name

    FROM accounts a

    LEFT JOIN folders f
    ON a.folderId = f.id

    WHERE
        a.userId = ?
        AND (
            a.applicationName LIKE ?
            OR a.username LIKE ?
            OR a.email LIKE ?
        )

    ORDER BY
        type ASC,
        applicationName ASC,
        folderName ASC;
    `;

    const keyword = `%${text}%`;

    const params = [
        userId,
        keyword,

        userId,
        keyword,
        keyword,
        keyword
    ];

    return await db.execute(sql, params)

}

const getTrash = (userId) => {
    
    const sql = `
        SELECT
        'folder' AS type,

        f.id,
        f.name,
        NULL AS applicationName,
        NULL AS username,
        NULL AS email,
        NULL AS owner,

        f.totalAccounts,

        f.isPinned,

        f.createdAt,
        f.updatedAt,
        f.deletedAt

    FROM folders f

    WHERE
        f.userId = ?
        AND f.isDeleted = TRUE

    UNION ALL

    SELECT
        'account' AS type,

        a.id,
        NULL AS name,

        a.applicationName,
        a.username,
        a.email,
        a.owner,

        NULL AS totalAccounts,

        a.isPinned,

        a.createdAt,
        a.updatedAt,
        a.deletedAt

    FROM accounts a

    WHERE
        a.userId = ?
        AND a.isDeleted = TRUE

    ORDER BY deletedAt DESC;
    `

}

export default {
    getByText,
    getTrash
}