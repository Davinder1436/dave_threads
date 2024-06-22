import { ApolloServer } from '@apollo/server';
import { User } from './user/index.js';
export async function graphqlService() {
    const qlServer = new ApolloServer({ typeDefs: `
    ${User.typeDefs}


    type Query{ ${User.queries}
    getContext: String
     } 

    type Mutation {${User.mutations}}
   `,
        resolvers: {
            Query: {
                getContext: (_, parameters, context) => {
                    console.log(context);
                    return "okay";
                },
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
