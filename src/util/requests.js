const axios = require('axios')
const aws4 = require('aws4')
const { getEndpoint } = require('./helpers')
const { endpoints } = require('./constants')

const getSignedRequest = (signBody, request) => {
    const { endpoint, environment, accessKey, secretKey } = request
    const selectedEndpoint = getEndpoint(endpoint, endpoints, environment)
    const action = 'CreateGiftCard'

    const opts = {
        region: selectedEndpoint.region,
        host: selectedEndpoint.host,
        path: `/${action}`,
        body: JSON.stringify(signBody),
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

const requestGiftCard = async (signedRequest) => {
    try {
        const params = {
            method: 'POST',
            url: `https://${signedRequest.host}${signedRequest.path}`,
            headers: signedRequest.headers,
            data: signedRequest.body,
        }
        const response = await axios(params)
        return response.data
    } catch(error) {
        console.log(error)
        throw new Error(error)
    }
}

module.exports = {
    getSignedRequest,
    requestGiftCard,
}