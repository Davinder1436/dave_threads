import { myPrisma } from "../lib/db.js";
export default class commentServices {
    static async createComment(payload) {
        const { content, userId, postId } = payload;
        return myPrisma.comment.create({
            data: {
                content,
                authorId: userId,
                postId
            }
        });
    }
}
