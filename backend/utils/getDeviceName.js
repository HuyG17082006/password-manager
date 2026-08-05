import { UAParser } from 'ua-parser-js';

export default (userAgent) => {
    const parser = new UAParser(userAgent);

    const browser = parser.getBrowser();
    const os = parser.getOS();

    return `${browser.name} on ${os.name}`;
}