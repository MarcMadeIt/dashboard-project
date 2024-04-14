"use server";

import { User } from "@/app/lib/models/user.model.js";
import { Product } from "@/app/lib/models/product.model.js";
import { connectToMongoDB } from "./utils";

export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 4;

    try {
        connectToMongoDB();
        const count = await User.find({ username: { $regex: regex } }).count();
        const users = await User.find({ username: { $regex: regex } })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1)).lean();
        return { count, users };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
};

export const fetchUser = async (id) => {

    console.log(id);

    try {
        connectToMongoDB();
        const user = await User.findById(id)
        return user;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user!");
    }
};





export const fetchProducts = async (q, page) => {
    console.log(q);
    const regex = new RegExp(q, "i");

    const ITEM_PER_PAGE = 4;

    try {
        connectToMongoDB();
        const count = await Product.find({ name: { $regex: regex } }).count();
        const products = await Product.find({ name: { $regex: regex } })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1)).lean();
        return { count, products };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch products!");
    }
};

export const fetchProduct = async (id) => {

    console.log(id);
    try {
        connectToMongoDB();
        const product = await Product.findById(id)
        return product;

    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch product");
    }
};
