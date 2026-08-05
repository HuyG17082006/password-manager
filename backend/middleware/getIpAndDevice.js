import getDeviceName from "../utils/getDeviceName.js";

export default (req, res, next) => {
    req.client = {
        ip : req.ip,
        deviceId : req.get('Device-Id'),
        deviceName : getDeviceName(req.get('User-Agent'))
    }

    next();
}