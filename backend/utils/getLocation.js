import geoIp from "geoip-lite";

export default (ip) => {
    const location = geoIp.lookup(ip);

    if (!location) {
        return "Unknown location";
    }

    return [
        location.city,
        location.region,
        location.country
    ]
        .filter(Boolean)
        .join(", ");
};