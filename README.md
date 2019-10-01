# Amazon-GC
> API client for using [Amazon Incentives API](https://developer.amazon.com/apps-and-games/incentives-api)
to [create gift cards on demand](http://s3.amazonaws.com/AGCOD/tech_spec/AGCODTechSpec_WC_Simplified_EN.pdf).

## Install
```
npm install amazon-gc
```

## Usage
```
const { createGiftCard } = require('amazon-gc')

const request = {
    amount: 20,
    currencyCode: 'USD',
    partnerId: 'yourPartnerId',
    accessKey: 'yourAccessKey',
    secretKey: 'yourSecretKey',
    environment: 'sandbox',
    endpoint: 'NA',
}

async function runSample() {
    const res = await createGiftCard(request);
    console.log(`Amazon gift card is ${JSON.stringify(res)}`)
}

runSample().catch(console.error)

```

## Other clients
- https://www.npmjs.com/package/agcod

## Problems
* If you find an issue or bug, please [file it on GitHub](https://github.com/john9hoff/amazon-gc/issues).