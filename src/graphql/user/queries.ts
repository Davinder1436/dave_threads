export const queries = `#graphql

getUserToken(email: String!, password: String!): String

getCurrentLoggedInUser: User

getPostsByUser:[Post]

getPostsByEmail(email: String!): [Post]

`;
