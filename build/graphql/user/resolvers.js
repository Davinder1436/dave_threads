import UserService from "../../service/user.js";
const queries = {
    getUserToken: async (_, payload) => {
        const res = await UserService.GetUserToken(payload);
        if (res)
            return res;
    },
    getCurrentLoggedInUser: async (_, payload, context) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.GetUserById(id);
            return user;
        }
        throw new Error("no user");
    }
};
const mutations = {
    createUser: async (_, payload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
};
export const resolvers = { queries, mutations };
