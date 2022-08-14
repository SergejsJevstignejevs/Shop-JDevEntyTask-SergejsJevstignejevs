import { ApolloServer } from 'apollo-server';

import typeDefs from './service/schema';
import resolvers from './service/resolvers';

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});