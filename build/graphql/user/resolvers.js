import UserService from "../../service/user.js";
import PostServices from "../../service/post.js";
const queries = {
    getUserToken: async (_, payload) => {
        const res = await UserService.GetUserToken(payload);
        if (res)
            return res;
    },
    getPostsByUser: async (_, payload, context) => {
        if (context && context.user) {
            const posts = await PostServices.getPosts(context.user.id);
            return posts;
        }
    },
    getCurrentLoggedInUser: async (_, payload, context) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.GetUserById(id);
            return user;
        }
        throw new Error("no user");
    },
    getPostsByEmail: async (_, email, context) => {
        if (context && context.user) {
            const posts = await PostServices.getPostsByemail(email);
            return posts;
        }
        else {
            throw new Error("sign in to access posts");
        }
    },
    getUserByPostId: async (_, id, context) => {
        if (context && context.user) {
            const user = await PostServices.getUserByPostId(id);
            return user;
        }
        else {
            throw new Error("sign in to access");
        }
    }
};
const mutations = {
    createUser: async (_, payload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    },
    createPost: async (_, payload, context) => {
        if (context && context.user) {
            const id = context.user.id;
            const res = await PostServices.createPost(id, payload);
            return res.id;
        }
        throw new Error("invalid user sign in first");
    },
    likePost: async (_, payload, context) => {
        if (context && context.user) {
            const id = context.user.id;
            const res = await PostServices.likePost(id, payload.postId);
            return res;
        }
        throw new Error("invalid user sign in first");
    }
};
export const resolvers = { queries, mutations };
