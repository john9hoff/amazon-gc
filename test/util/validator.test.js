const { validateInputJson } = require('../../src/util/validator')

describe('validateInputJson', () => {
  const request = {
    amount: 20,
    currencyCode: 'USD',
    partnerId: 'yourPartnerId',
    accessKey: 'yourAccessKey',
    secretKey: 'yourSecretKey',
    environment: 'sandbox',
    endpoint: 'NA',
  }

  const stringFields = [ 'currencyCode', 'partnerId', 'accessKey', 'secretKey' ]
  
  const enums = {
    environment: [ 'sandbox', 'production' ],
    endpoint: [ 'NA', 'EU', 'FE' ]
  }

  test('Good request', () => {
    expect(() => validateInputJson(request)).not.toThrowError()
  })

  test('Null JSON throws error', () => {
    expect(() => validateInputJson(null)).toThrowError()
  })

  test('Invalid amount throws error', () => {
    const badAmounts = [ 0, '0', -20, '-20', '' ]

    badAmounts.forEach(amount => expect(() => validateInputJson({ ...request, amount })).toThrowError())
  })

  test('Valid strings', () => {
    const goodStrings = [ '35', 'yes', '-another' ]

    stringFields.forEach(field => {
      goodStrings.forEach(string => expect(() => validateInputJson({ ...request, [field]: string })).not.toThrowError())
    })
  })

  test('Non-string value throws error', () => {
    const badStrings = [ 35, [], '' ]

    stringFields.forEach(field => badStrings.forEach(badString => expect(() => validateInputJson({ ...request, [field]: badString })).toThrowError()))
  })

  test('Valid enums', () => {
    for(let field in enums) {
      enums[field].forEach(value => expect(() => validateInputJson({ ...request, [field]: value })).not.toThrowError())
    }
  })

  test('Invalid enum throws error', () => {
    for(let field in enums) {
      const values = enums[field]
  
      values.forEach(value => {
        expect(() => validateInputJson({ ...request, [field]: ` ${value} ` })).toThrowError()
        expect(() => validateInputJson({ ...request, [field]: `${value} ` })).toThrowError()
        expect(() => validateInputJson({ ...request, [field]: ` ${value}` })).toThrowError()
        expect(() => validateInputJson({ ...request, [field]: (value === value.toLowerCase() ? value.toUpperCase() : value.toLowerCase()) })).toThrowError()
      })
  
      expect(() => validateInputJson({ ...request, [field]: values.join('') })).toThrowError()
    }
  })
})

