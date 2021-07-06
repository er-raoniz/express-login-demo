const { body, param, validationResult } = require('express-validator')

const listRules = () => {
    return [
        param('first_name').trim().escape().optional(),
        param('last_name').trim().escape().optional(),
        param('emp_id').trim().escape().optional()
    ]
}

const loginRules = () => {
    return [
        body('email_id').trim().escape().exists().normalizeEmail().isEmail(),
        body('password').trim().escape().exists().isLength({ min: 8, max: 16 }).isAlphanumeric()
    ]
}

const registerRules = () => {
    return [
        body('first_name').trim().escape().exists().isAlpha(),
        body('last_name').trim().escape().exists().isAlpha(),
        body('email_id').trim().escape().exists().normalizeEmail().trim().escape().isEmail(),
        body('password').trim().escape().exists().trim().escape().isLength({ min: 8, max: 16 }).isAlphanumeric(),
        body('emp_id').trim().escape().exists().isAlphanumeric(),
        body('org_name').trim().escape().exists().isAlpha()
    ]
}

const validate = (request, response, next) => {
    const errors = validationResult(request);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return response.status(400).json({
        errors: extractedErrors,
    });
}

module.exports = {
    listRules,
    loginRules,
    registerRules,
    validate
}