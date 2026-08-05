import cors from 'cors'
import { SERVER_BASE_API } from '../constants/server.constants.js'

const ORIGIN = ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000', SERVER_BASE_API]

export default cors({
    credentials : true,
    origin : ORIGIN
})