import Fetch from "../../../../services/Fetch.js"

export default async (api, options = {}) => {
    return await Fetch(`/accounts${api}`, options);
}