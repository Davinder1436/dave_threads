import { myPrisma } from "../lib/db.js";
import  UserService  from "./user.js";
export interface createPostPayload{
 content: string;
 imageUrl?: string;
 videoUrl?: string;
}


export default class PostService {

    public static async createPost( id:string, payload:createPostPayload){
        const {content, imageUrl, videoUrl} = payload;
        return myPrisma.user.update({
            where:{id},
            data:{
                posts:{
                    create:{
                        content,
                        imageURL:imageUrl,
                        VideoURL:videoUrl


                    }
                }
            }

        })
        
    }
    public static async getPosts(userId:string){
        return myPrisma.post.findMany({where:{userId}})
    }
    public static async getPostsByemail(payload:any){
        const {email} = payload
        
        const user = await UserService.GetUserByEmail(email);
       
        return myPrisma.post.findMany({where:{userId:user?.id}})
        
       
    }
    public static async getUserByPostId(id:string){
        return myPrisma.post.findUnique(
            {where:{id},include:{user:true}}
        )
    }
    public static async deletePost(id:string){
        return myPrisma.post.delete({where:{id}})
    }
    public static async likePost(userId:string,postId:string){
        return myPrisma.like.create({
            data:{
                userId,
                postId
            }
        })
        
    }
}
