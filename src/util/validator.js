const Joi = require('joi');

const schema = {
    amount: Joi.number().min(1).required(),
    currencyCode: Joi.string().required(),
    partnerId: Joi.string().required(),
    accessKey: Joi.string().required(),
    secretKey: Joi.string().required(),
    environment: Joi.string().valid('sandbox', 'production').required(),
    endpoint: Joi.string().valid('NA', 'EU', 'FE').required()
}

module.exports.validateInputJson = (json) => {
    if (!json) {
        throw new Error('JSON cannot be null')
    }

    const validator = Joi.object().keys(schema).unknown(true)

    const { error } = Joi.validate(json, validator, { abortEarly: false })
    if (error) {
        throw new Error(`${error.name} - ${JSON.stringify(error.message)}`)
    }
}