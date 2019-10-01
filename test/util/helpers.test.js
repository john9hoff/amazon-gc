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

endpoints.forEach((endpoint) => {
    const { location, environment } = endpoint

    test(`getEndpoint returns correct result for location: ${location} and environment: ${environment}`, () => {
        const result = getEndpoint(location, endpoints, environment)
        expect(result).toEqual(endpoint)
    })
})