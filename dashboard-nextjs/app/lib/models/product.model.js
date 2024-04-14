import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: Buffer,
    },
    quantity: {
        type: Number,
        min: 0,
    },
    cat: {
        type: String,
        enum: ['Phones', 'Covers', 'Chargers', 'Holders'],
    },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);