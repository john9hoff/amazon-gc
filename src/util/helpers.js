const BigNumber = require('bignumber.js')

const roundAmount = (amount) => Math.round(amount * 100) / 100

const getNewId = () => {
    const hrTime = process.hrtime()
    return new BigNumber(hrTime[0]).times('1e9').plus(hrTime[1]).toString(36)
}

const createGiftCardRequest = (sequentialId, partnerId, amount, currencyCode) => {
    return {
        creationRequestId: `${partnerId}${sequentialId}`,
        partnerId,
        value: {
            amount: roundAmount(amount),
            currencyCode,
        },
    }
}

module.exports = {
    roundAmount,
    getNewId,
    createGiftCardRequest,
}