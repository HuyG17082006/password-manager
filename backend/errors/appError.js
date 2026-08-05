export default ({ code, message }, errors) => ({
    code,
    message,
    errors : {
        ...errors
    }
})