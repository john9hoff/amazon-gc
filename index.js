const { createGiftCardRequest } = require('./src/util/helpers')
const { requestGiftCard, getSignedRequest } = require('./src/util/requests')
const validator = require('./src/util/validator')

async function createGiftCard(request) {
    validator.validateInputJson(request)

    const signBody = createGiftCardRequest(request)
    const signedRequest = getSignedRequest(signBody, request)

    return await requestGiftCard(signedRequest)
}

module.exports = {
    createGiftCard,
}