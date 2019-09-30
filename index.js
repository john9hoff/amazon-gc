const {getNewId, createGiftCardRequest} = require('./src/util/helpers')
const {requestGiftCard, getSignedRequest} = require('./src/util/requests')
const validator = require('./src/util/validator')

async function createGiftCard(request) {
    validator.validateInputJson(request)
    const sequentialId = getNewId()
    const signBody = createGiftCardRequest(sequentialId, request.partnerId, request.amount, request.currencyCode)
    const signedRequest = getSignedRequest(signBody, request.endpoint, request.environment, request.accessKey, request.secretKey)
    return await requestGiftCard(signedRequest)
}

module.exports = {
    createGiftCard
}