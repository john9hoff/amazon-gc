const { createGiftCardRequest, getEndpoint } = require('../../src/util/helpers')
const { endpoints } = require('../../src/util/constants')


test('createGiftCardRequest', () => {
    const request = {
        amount: 20,
        currencyCode: 'USD',
        partnerId: 'testPartnerId',
    }
    const result = createGiftCardRequest(request)
    expect(result.creationRequestId).toBeDefined()
    expect(result.partnerId).toBe('testPartnerId')
    expect(result.value.currencyCode).toBe('USD')
    expect(result.value.amount).toBe(20)
})

test('getEndpoints', () => {
    const endpointNames = ['NA', 'EU', 'FE']
    const environments = ['sandbox', 'production']
    const hosts = ['agcod-v2-gamma.amazon.com', 'agcod-v2.amazon.com', 'agcod-v2-eu-gamma.amazon.com', 
                            'agcod-v2-eu.amazon.com', 'agcod-v2-fe-gamma.amazon.com', 'agcod-v2-fe.amazon.com']
    const regions = ['us-east-1', 'eu-west-1', 'us-west-2']
    for (i = 0; i < endpointNames.length; i++) {
        for (j = 0; j < environments.length; j++) {
            const result = getEndpoint(endpointNames[i], endpoints, environments[j])
            expect(result).toBe(endpoints[i * environments.length + j])
        }
    }
})