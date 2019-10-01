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

test('getEndpoint', () => {
    const endpoint = 'EU'
    const environment = 'production'
    const result = getEndpoint(endpoint, endpoints, environment)
    expect(result.location).toBe('EU')
    expect(result.environment).toBe('production')
    expect(result.host).toBe('agcod-v2-eu.amazon.com')
    expect(result.region).toBe('eu-west-1')
})