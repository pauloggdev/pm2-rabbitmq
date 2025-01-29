export function mapError(validationErrors) {
    const errorMap = {};
    validationErrors.forEach(error => {
        errorMap[error.path] = error.msg;
    });
    return errorMap;
}