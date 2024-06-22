import express from 'express';
import {graphqlService} from './graphql/index.js'
import {expressMiddleware} from '@apollo/server/express4'
import UserService from './service/user.js';


async function main(){
    const app = express();
    app.use(express.json());
const PORT = Number(process.env.PORT) || 8000;





app.get("/", (req, res) => {
    res.send("Hello World!");
})
const qlserver = await graphqlService();

app.use("/graphql", expressMiddleware(qlserver,{context :async({req})=>{
    //@ts-ignore
    const token = req.headers["token"];
    try{
        const user = await UserService.decodeJWT(token as string);
        return {user}
    }
    catch(error){
        return {};

    }

}}));

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})
}

main()


