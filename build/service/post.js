import { myPrisma } from "../lib/db.js";
import UserService from "./user.js";
export default class PostService {
    static async createPost(id, payload) {
        const { content, imageUrl, videoUrl } = payload;
        return myPrisma.user.update({
            where: { id },
            data: {
                posts: {
                    create: {
                        content,
                        imageURL: imageUrl,
                        VideoURL: videoUrl
                    }
                }
            }
        });
    }
    static async getPosts(userId) {
        return myPrisma.post.findMany({ where: { userId } });
    }
    static async getPostsByemail(payload) {
        const { email } = payload;
        const user = await UserService.GetUserByEmail(email);
        return myPrisma.post.findMany({ where: { userId: user?.id } });
    }
    static async getUserByPostId(id) {
        return myPrisma.post.findUnique({ where: { id }, include: { user: true } });
    }
    static async deletePost(id) {
        return myPrisma.post.delete({ where: { id } });
    }
    static async likePost(userId, postId) {
        return myPrisma.like.create({
            data: {
                userId,
                postId
            }
        });
    }
}
