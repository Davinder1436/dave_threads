import { myPrisma } from "../lib/db.js";

export interface createPostPayload{
 content: string;
 imageUrl?: string;
 videoUrl?: string;
}


export default class PostService {

    public static async createPost( id:string, payload:createPostPayload){
        const {content, imageUrl, videoUrl} = payload;
        return myPrisma.post.create(
                {data:{
                    content,
                    imageURL:imageUrl,
                    VideoURL:videoUrl,
                    creatorId:id
                }}
        )
    }
    public static async getPosts(creatorId:string){
        return myPrisma.post.findMany({where:{creatorId}})
    }
    public static async getPostsByemail(email:string){
        return myPrisma.post.findMany({where:{creator:{email}}})
    }
}
