import express from 'express'
import {loginValidation, registerValidation} from './validations.js'
import checkAuth from "./middleware/checkAuth.js";
import UserController from "./controllers/UserController.js";
import cors from "cors";
import handleValidationErrors from "./utils/handleValidationErrors.js";

const app = express()
app.use(express.json())
app.use(cors())

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/registration', registerValidation, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

const start = async () => {
    try {
        const PORT = process.env.PORT || 5001
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()