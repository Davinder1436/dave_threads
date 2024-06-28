import { myPrisma } from "../lib/db.js";
export default class commentServices{

    public static async createComment(payload:any){
        const {content,userId, postId} = payload;
        return myPrisma.comment.create({
            data:{
                content,
                authorId:userId,
                postId
            }
        })
    }
    public static async getCommentForPost(postId:string){
        return myPrisma.comment.findMany({where:{postId}})
    }
    
    
}