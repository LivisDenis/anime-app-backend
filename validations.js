import {body} from "express-validator";

const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 6}),
    body('fullName', 'Укажите имя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
]

const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 6}),
]

export {
    registerValidation,
    loginValidation,
}
