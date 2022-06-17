import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://bjgjo43suvfr3at5bvsp4hxegi.appsync-api.us-east-1.amazonaws.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        'x-api-key': 'da2-lnsrz3lckrhclj5v2jwsx4g56i',
    }
});

export default client;