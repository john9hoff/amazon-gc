const {
    getNewId,
    createGiftCardRequest,
} = require('./util/helpers')
const {
    requestGiftCard,
    getSignedRequest,
} = require('./util/requests')

async function createGiftCard(request) {
    try {
        const sequentialId = getNewId()
        const signBody = createGiftCardRequest(sequentialId, request.partnerId, request.amount, request.currencyCode)
        const signedRequest = getSignedRequest(signBody, request.endpoint, request.accessKey, request.secretKey)
        return await requestGiftCard(signedRequest)
    } catch(e) {
        throw new Error(e.message)
    }
}


module.exports = {
    createGiftCard
}