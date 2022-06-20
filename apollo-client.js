import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://h6lvdmjlojbvveexmz4o3hwdhi.appsync-api.us-east-1.amazonaws.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        'x-api-key': 'da2-5eroj2zwyncunjssw4ykzv33ha',
    }
});

export default client;