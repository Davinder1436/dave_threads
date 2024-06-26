import { ApolloServer } from '@apollo/server';
import { User } from './user/index.js';
export async function graphqlService() {
    const qlServer = new ApolloServer({ typeDefs: `
    ${User.typeDefs}


    type Query{ ${User.queries}}
    


    type Mutation{ ${User.mutations}}
   `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }
    });
    await qlServer.start();
    return qlServer;
}
