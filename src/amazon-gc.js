const BigNumber = require('bignumber.js')
const axios = require('axios')
const aws4 = require('aws4')

const currencyCode = 'USD'
const partnerId = 'test'
const accessKey = 'test'
const secretKey = 'test'
const endpoint = {
    host: 'agcod-v2-gamma.amazon.com',
    region: 'us-east-1',
}

const createGiftCard = async (amount) => {
    const sequentialId = getNewId()
    const requestBody = getCreateGiftCardRequestBody(partnerId, sequentialId, amount, currencyCode)
    const signedRequest = await _getSignedRequest(requestBody)
    const result = await _doRequest(signedRequest)
    console.log(result)
    return result
}

const _getSignedRequest = async (requestBody) => {
    const action = 'CreateGiftCard'
    const opts = {
        region: endpoint.region,
        host: endpoint.host,
        path: `/${action}`,
        body: JSON.stringify(requestBody),
        service: 'AGCODService',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'x-amz-target': `com.amazonaws.agcod.AGCODService.${action}`,
        },
        method: 'POST',
        securityOptions: 'SSL_OP_NO_SSLv3',
    }
    const credentials = {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    }
    return aws4.sign(opts, credentials)
}

const _doRequest = async (signedRequest) => {
    try {
        const params = {
            method: 'POST',
            url: `https://${signedRequest.host}${signedRequest.path}`,
            headers: signedRequest.headers,
            data: signedRequest.body,
        }
        const response = await axios(params)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

const roundAmount = (amount) => Math.round(amount * 100) / 100

const createGiftCardRequest = (partnerId, sequentialId, amount, currencyCode) => {
    return {
        creationRequestId: `${partnerId}${sequentialId}`,
        partnerId,
        value: {
            amount: roundAmount(amount),
            currencyCode,
        },
    }
}

const getNewId = () => {
    const hrTime = process.hrtime()
    return new BigNumber(hrTime[0]).times('1e9').plus(hrTime[1]).toString(36)
}

const getCreateGiftCardRequestBody = (partnerId, sequentialId, amount, currencyCode) => {
    return createGiftCardRequest(partnerId, sequentialId, amount, currencyCode)
}

module.exports = {
    createGiftCard
}