import mongoose from "mongoose";

const FavModel = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true
        },
        attributes: {
            type: Object,
            require: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Favourite', FavModel)