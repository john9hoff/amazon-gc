const { validateInputJson } = require('../../src/util/validator')

test('validateInputJson', () => {
  const goodRequest = {
    amount: 20,
    currencyCode: 'USD',
    partnerId: 'yourPartnerId',
    accessKey: 'yourAccessKey',
    secretKey: 'yourSecretKey',
    environment: 'sandbox',
    endpoint: 'NA',
  }

  expect(() => validateInputJson(goodRequest)).not.toThrowError()
  expect(() => validateInputJson(null)).toThrowError('JSON cannot be null')

  expect(() => validateInputJson({ ...goodRequest, amount: '20' })).not.toThrowError()
  expect(() => validateInputJson({ ...goodRequest, amount: 999999 })).not.toThrowError()
  
  expect(() => validateInputJson({ ...goodRequest, amount: 0 })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, amount: '0' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, amount: -20 })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, amount: '-20' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, amount: '' })).toThrowError()

  expect(() => validateInputJson({ ...goodRequest, currencyCode: '35' })).not.toThrowError()

  expect(() => validateInputJson({ ...goodRequest, currencyCode: 35 })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, currencyCode: [] })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, currencyCode: '' })).toThrowError()

  expect(() => validateInputJson({ ...goodRequest, partnerId: '35' })).not.toThrowError()

  expect(() => validateInputJson({ ...goodRequest, partnerId: 35 })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, partnerId: [] })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, partnerId: '' })).toThrowError()
  
  expect(() => validateInputJson({ ...goodRequest, accessKey: '35' })).not.toThrowError()

  expect(() => validateInputJson({ ...goodRequest, accessKey: 35 })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, accessKey: [] })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, accessKey: '' })).toThrowError()

  expect(() => validateInputJson({ ...goodRequest, secretKey: '35' })).not.toThrowError()

  expect(() => validateInputJson({ ...goodRequest, secretKey: 35 })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, secretKey: [] })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, secretKey: '' })).toThrowError()

  expect(() => validateInputJson({ ...goodRequest, environment: 'sandbox' })).not.toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: 'production' })).not.toThrowError()

  expect(() => validateInputJson({ ...goodRequest, environment: ' sandbox ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: 'sandbox ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: ' sandbox' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: ' production ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: 'production ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: ' production' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: 'SANDBOX' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: 'PRODUCTION' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, environment: 'productionsandbox' })).toThrowError()

  expect(() => validateInputJson({ ...goodRequest, endpoint: 'EU' })).not.toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: 'FE' })).not.toThrowError()

  expect(() => validateInputJson({ ...goodRequest, endpoint: 'na' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: 'eu' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: 'fe' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: ' na ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: ' eu ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: ' fe ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: ' na' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: ' eu' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: ' fe' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: 'na ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: 'eu ' })).toThrowError()
  expect(() => validateInputJson({ ...goodRequest, endpoint: 'fe ' })).toThrowError()
})
