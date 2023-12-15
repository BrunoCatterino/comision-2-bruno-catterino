const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "titulo requerido"],
        },
        content: {
            type: String,
            required: [true, "contenido requerido"],
        },
        postedBy: {
            type: ObjectId,
            ref: "Usuario",
        },
        image: {
            url: String,
            public_id: String,
        },
        likes: [{ type: ObjectId, ref: "Usuario" }],
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                postedBy: {
                    type: ObjectId,
                    ref: "Usuario",
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);