import { model, Schema } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /[a-z]/.test(v);
            },
            message: props => `"${props.value}" is entirely uppercase! Title must not be entirely uppercase.`
        }
    },
    content: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true 
});

export const Note = model("Note", schema);