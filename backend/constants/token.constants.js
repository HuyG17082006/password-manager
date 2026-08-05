const REFRESH_TOKEN = {
    secret : process.env.REFRESH_TOKEN_SECRET,
    expired : {
        jwt : process.env.REFRESH_TOKEN_EXPIRED + "d",
        mysql : process.env.REFRESH_TOKEN_EXPIRED + " DAY" , 
        number : Number(process.env.REFRESH_TOKEN_EXPIRED) * 24 * 60 * 60 * 1000
    }
}

const ACCESS_TOKEN = {
    secret : process.env.ACCESS_TOKEN_SECRET,
    expired : {
        jwt : process.env.ACCESS_TOKEN_EXPIRED + 'm'
    }
}

const RESET_TOKEN = {
    secret : process.env.RESET_TOKEN_SECRET,
    expired : {
        jwt : process.env.RESET_TOKEN_EXPIRED + 'm'
    }
}

const REGISTER_TOKEN = {
    secret : process.env.REGISTER_TOKEN_SECRET,
    expired : {
        jwt : process.env.REGISTER_TOKEN_EXPIRED + 'm'
    }
}

export {
    REFRESH_TOKEN,
    ACCESS_TOKEN,
    RESET_TOKEN,
    REGISTER_TOKEN
}