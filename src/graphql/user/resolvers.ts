
import UserService, { createUserPayload, getUserTokenPayload } from "../../service/user.js"

import PostServices, { createPostPayload } from "../../service/post.js"


const queries = {

    getUserToken: async (_:any, payload:{email:string, password:string}) => {
        const res = await UserService.GetUserToken(payload)
        if(res) return res

    
},

getPostsByUser: async (_:any, payload:any, context:any) => {

    if(context && context.user){
        const posts = await PostServices.getPosts(context.user.id)
        return posts
    }
},

getCurrentLoggedInUser: async (_:any,payload:any , context:any) => {
    
    if(context&& context.user){
        const id = context.user.id
        const user  = await UserService.GetUserById(id)
    
        return user
    }

    throw new Error("no user");
},

getPostsByEmail: async(_:any, email:string, context:any) => {
    if(context&&context.user){
        const posts = await PostServices.getPostsByemail(email)
        return posts
    }
    else{
        throw new Error("sign in to access posts")
    }
}


}

const mutations = {

    createUser : async (_:any, payload:createUserPayload) => {
        const res = await UserService.createUser(payload)
        return res.id
    },

    createPost: async (_:any, payload:createPostPayload, context:any) => {
        if(context && context.user){
            const id = context.user.id
            const res = await PostServices.createPost(id, payload)
            return res.id
        }
        throw new Error("invalid user sign in first")
    }
}
  


export const resolvers = {queries, mutations }
