import  JWT  from "jsonwebtoken";
import { myPrisma } from "../lib/db.js";
import {createHmac , randomBytes} from "node:crypto"

 export interface createUserPayload{

    firstName : string;
    lastName : string;
    email : string;
    password : string;
}
export interface getUserTokenPayload{
    email:string;
    password:string;
}
const secret = process.env.JWT_SECRET || "secret"

class UserService {
    public static createUser(payload:createUserPayload){
        const {firstName,lastName,email,password} = payload;
         const salt = randomBytes(32).toString()
         const hashedPassword = createHmac("sha256",salt).update(password).digest("hex")
        return myPrisma.user.create(
            {
                data : {
                    firstName,
                    lastName,
                    email,
                    salt,
                    password : hashedPassword
                }
            }
        )
    }
    public static GetUserById(id:string){
        return myPrisma.user.findUnique({where:{id}})
    }
    public  static GetUserByEmail(email:string){
        const user = myPrisma.user.findUnique({where:{email}})
        return user
    }

    public static async GetUserToken(payload:getUserTokenPayload){
        const {email,password} = payload;
        const user = await UserService.GetUserByEmail(email);
        if (!user){throw new Error("User not found")}
        const salt = user.salt
        const hashedPassword = createHmac("sha256",salt).update(password).digest("hex")
        if(hashedPassword !== user.password){throw new Error("Incorrect password")}

        const token = JWT.sign({id:user.id,email:user.email}, secret)
        return token;
    }

    public static async decodeJWT(token:string){
        try{
return JWT.verify(token,secret)}
        catch(error){
            return null
        }

    }
}

export default UserService