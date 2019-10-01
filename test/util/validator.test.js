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

  const stringFields = [ 'currencyCode', 'partnerId', 'accessKey', 'secretKey' ]
  const enumFields = [ 'environment', 'endpoint' ]
  const badStrings = [ 35, [], '' ]
  const goodEnums = {
    environment: [ 'sandbox', 'production' ],
    endpoint: [ 'NA', 'EU', 'FE' ]
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

  stringFields.forEach(field => {
    expect(() => validateInputJson({ ...goodRequest, [field]: '35' })).not.toThrowError()

    badStrings.forEach(badString => expect(() => validateInputJson({ ...goodRequest, [field]: badString })).toThrowError())
  })

  enumFields.forEach(field => {
    const values = goodEnums[field]

    values.forEach(value => {
      expect(() => validateInputJson({ ...goodRequest, [field]: value })).not.toThrowError()

      expect(() => validateInputJson({ ...goodRequest, [field]: ` ${value} ` })).toThrowError()
      expect(() => validateInputJson({ ...goodRequest, [field]: `${value} ` })).toThrowError()
      expect(() => validateInputJson({ ...goodRequest, [field]: ` ${value}` })).toThrowError()
      expect(() => validateInputJson({ ...goodRequest, [field]: (value === value.toLowerCase() ? value.toUpperCase() : value.toLowerCase()) })).toThrowError()
    })

    expect(() => validateInputJson({ ...goodRequest, [field]: values.join('') })).toThrowError()
  })
})
