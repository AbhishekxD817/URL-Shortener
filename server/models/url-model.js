import { Schema, model } from "mongoose";

const urlSchema = Schema({
    shortenUrl: {
        type: String,
        required: true,
        unique: true
    },
    destinationUrl: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const Url = model("Url", urlSchema);

export default Url;