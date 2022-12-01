import FavModel from "../models/Fav.js";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
    const token = (req.headers.authorization).replace('Bearer ', '')
    const decoded = jwt.decode(token, 'secret123')

    try {
        const posts = await FavModel.find({ user: decoded._id }).populate('user').exec()
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить аниме'
        })
    }
}

const create = async (req, res) => {
    try {
        const doc = new FavModel({
            id: req.body.id,
            attributes: req.body.attributes,
            user: req.userId,
        })

        const fav = await doc.save()

        res.json(fav)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось сохранить'
        })
    }
}

const remove = (req, res) => {
    try {
        const favouriteId = req.params.id

        FavModel.findByIdAndDelete(
            {
                _id: favouriteId
            },
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Нe удалось удалить аниме'
                    })
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Аниме не найдено'
                    })
                }

                res.json({
                    success: true,
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось удалить аниме'
        })
    }
}

export default {
    create,
    getAll,
    remove
}