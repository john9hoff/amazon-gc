const endpoints = [
    {
        location: 'NA',
        environment: 'sandbox',
        host: 'agcod-v2-gamma.amazon.com',
        region: 'us-east-1',
    },
    {
        location: 'NA',
        environment: 'prod',
        host: 'agcod-v2.amazon.com',
        region: 'us-east-1',
    },
    {
        location: 'EU',
        environment: 'sandbox',
        host: 'agcod-v2-eu-gamma.amazon.com',
        region: 'eu-west-1',
    },
    {
        location: 'EU',
        environment: 'prod',
        host: 'agcod-v2-eu.amazon.com',
        region: 'eu-west-1',
    },
    {
        location: 'FE',
        environment: 'sandbox',
        host: 'agcod-v2-fe-gamma.amazon.com',
        region: 'us-west-2',
    },
    {
        location: 'FE',
        environment: 'prod',
        host: 'agcod-v2-fe.amazon.com',
        region: 'us-west-2',
    },
]

module.exports = {
    endpoints,
}