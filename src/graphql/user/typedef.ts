export const typeDefs = `#graphql

type User{
id : ID!
firstName : String!
lastName : String!
profile_image_url : String
email:  String!
posts : [Post]
likes: [Like]
comments: [Comment]
}

type Post{
id : ID!
content : String!
creatorId : ID!
createdAt : String!
likes: [Like]
comments: [Comment]
}

type Like{
id : ID!
userId : ID!
postId : ID!
}

type Comment{
id:ID!
authorId : ID!
postId : ID!
content : String!
createdAt : String!
}

`