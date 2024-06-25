export const mutations = `#graphql

createUser(firstName: String!, lastName: String! ,email: String!,password: String!):String

createPost(content: String!,imageUrl: String, videoUrl: String ):String

likePost(userid:ID!,postId:ID!):String

`;

