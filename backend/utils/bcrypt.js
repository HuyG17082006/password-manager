import bcrypt from 'bcrypt'

const hash = async (data) => {
    return await bcrypt.hash(data, await bcrypt.genSalt(10));
}

const compare = async (data, hashData) => {
    return await bcrypt.compare(data, hashData);
}

export default {
    hash, compare
}