export default (fn) => {
    return async (req, res, next) => {

        console.time(fn.name);

        try {
            await fn(req, res, next);
        } catch (err) {
            console.error(err)
            next(err);
        } finally {
            console.timeEnd(fn.name)
        }
    };
};
