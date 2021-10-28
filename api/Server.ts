import express from 'express'
import { userRegisterEndpoint } from './endpoints/UserRegister';

const app = express()

//set middleware
app.use((req, res, next) => {
    console.log(req.query)
    console.log(req.headers)

    next();
})

app.use(userRegisterEndpoint)



console.clear();
app.listen(3001, () => {
    console.log("listening port 3001")
    
});