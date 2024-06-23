import JWT from "jsonwebtoken";
import { myPrisma } from "../lib/db.js";
import { createHmac, randomBytes } from "node:crypto";
const secret = process.env.JWT_SECRET || "secret";
class UserService {
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString();
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
        return myPrisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword
            }
        });
    }
    static GetUserById(id) {
        return myPrisma.user.findUnique({ where: { id } });
    }
    static GetUSerByEmail(email) {
        const user = myPrisma.user.findUnique({ where: { email } });
        return user;
    }
    static async GetUserToken(payload) {
        const { email, password } = payload;
        const user = await UserService.GetUSerByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const salt = user.salt;
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
        if (hashedPassword !== user.password) {
            throw new Error("Incorrect password");
        }
        const token = JWT.sign({ id: user.id, email: user.email }, secret);
        return token;
    }
    static async decodeJWT(token) {
        try {
            return JWT.verify(token, secret);
        }
        catch (error) {
            return null;
        }
    }
}
export default UserService;
