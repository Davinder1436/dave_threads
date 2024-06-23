import { myPrisma } from "../lib/db.js";
export default class PostService {
    static async createPost(id, payload) {
        const { content, imageUrl, videoUrl } = payload;
        return myPrisma.post.create({ data: {
                content,
                imageURL: imageUrl,
                VideoURL: videoUrl,
                creatorId: id
            } });
    }
    static async getPosts(creatorId) {
        return myPrisma.post.findMany({ where: { creatorId } });
    }
    static async getPostsByemail(email) {
        return myPrisma.post.findMany({ where: { creator: { email } } });
    }
}
