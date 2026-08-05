const isMySQLError = (err) => {
  if (!err || !err.code) return false;
  return err.code.startsWith("ER_");
}

export default (err, req, res, next) => {

    let code = err.code || 500;
    const errors = err.errors || {};

    let message = err.message || "SERVER_ERROR";

    const isNumber = typeof err.code === 'number'

    if (!isNumber && isMySQLError(err)) {
        message = "SERVER_ERROR"
        errors.error = "Lỗi không xác định"
        code = 500;
    }

    console.error(`
        ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${code} - ${message}
    `)

    return res.status(code).json({
        message,
        errors
    })

}