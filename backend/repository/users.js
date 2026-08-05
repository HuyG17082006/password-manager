import db from "../config/db.js";

const findById = async (id, conn = db) => {
    const [result] = await conn.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );

    return result[0] || null;
};

const findByEmail = async (email, conn = db) => {
    const [result] = await conn.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    return result[0] || null;
};

const findByUsername = async (username, conn = db) => {
    const [result] = await conn.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );

    return result[0] || null;
};

const updateFirstLogin = async (id, conn = db) => {
    const [result] = await conn.execute(
        'UPDATE users SET isNewUser = false WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

const updateEmailVerifyById = async (id, conn = db) => {
    const [result] = await conn.execute(
        'UPDATE users SET isEmailVerified = true WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

const createUser = async (
    id,
    username,
    hashPassword,
    email,
    verify = false,
    conn = db
) => {
    const [result] = await conn.execute(
        `INSERT INTO users (
            id,
            username,
            passwordHash,
            email,
            isEmailVerified
        ) VALUES (?, ?, ?, ?, ?)`,
        [id, username, hashPassword, email, verify]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id, conn = db) => {
    const [result] = await conn.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

export default {
    findById,
    findByEmail,
    findByUsername,

    updateFirstLogin,
    updateEmailVerifyById,

    createUser,

    deleteById
};