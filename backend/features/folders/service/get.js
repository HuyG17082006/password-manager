import folders from "../../../repository/folders.js";

export const getAll = async (userId) => {

    const result = await folders.get(userId);

    return {
        list : result[0]
    }
}
