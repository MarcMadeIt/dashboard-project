"use server";

import { connectToMongoDB } from "./utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { Product } from "./models/product.model.js";
import { User } from "./models/user.model";
import { signIn } from "../auth";

export const addUser = async (formData, res) => {
    try {
        connectToMongoDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(formData.get('password'), salt);

        const { username, email, phone, role, status } = Object.fromEntries(formData);

        let img;
        if (formData.get('img')) {
            const imgData = await formData.get('img').arrayBuffer();
            img = Buffer.from(imgData);
        } else {
            console.error("Error: No image data provided");
        }

        const newUser = new User({
            username,
            email,
            phone,
            img,
            password: hashedPassword,
            role,
            status
        });

        await newUser.save();

        const plainUser = newUser.toObject();

        plainUser._id = plainUser._id.toString();

        console.log("User added successfully:");


    } catch (err) {
        console.error("Error adding user:", err);
        throw new Error("Failed to add user: " + err.message);
    }

    // Update cached users page
    revalidatePath("/dashboard/users");

    // Redirect to the user page after successfully adding a user
    redirect("/dashboard/users", res);
};


export const updateUser = async (formData, res) => {
    const { id, username, email, phone, password, role, status } = Object.fromEntries(formData);

    let img;
    if (formData.get('img')) {
        const imgData = await formData.get('img').arrayBuffer();
        img = Buffer.from(imgData);
    } else {
        console.error("Error: No image data provided");
    }

    try {
        connectToMongoDB();

        const updateFields = {
            username, email, password, phone, role, status
        }

        Object.keys(updateFields).forEach(
            (key) =>
                (updateFields[key] === "" || undefined) && delete updateFields[key]
        );

        await User.findByIdAndUpdate(id, updateFields);

        console.log("User updated successfully:");

    } catch (err) {
        console.error("Error adding user:", err);
        throw new Error("Failed to add user: " + err.message);
    }

    revalidatePath("/dashboard/users");

    redirect("/dashboard/users", res);
};


export const addProduct = async (formData, res) => {
    try {
        connectToMongoDB();

        const { name, desc, price, quantity, cat } = Object.fromEntries(formData);

        let img;
        if (formData.get('img')) {
            const imgData = await formData.get('img').arrayBuffer();
            img = Buffer.from(imgData);
        } else {
            console.error("Error: No image data provided");
        }

        const newProduct = new Product({
            name, desc, price, cat, quantity, img
        });

        await newProduct.save();

        const plainProduct = newProduct.toObject();

        plainProduct._id = plainProduct._id.toString();

        console.log("Product added successfully:");

    } catch (err) {
        console.error("Error adding product:", err);
        throw new Error("Failed to add product: " + err.message);
    }

    revalidatePath("/dashboard/products");

    redirect("/dashboard/products", res);
};

export const updateProduct = async (formData, res) => {
    const { id, name, desc, price, cat, quantity } = Object.fromEntries(formData);

    try {
        connectToMongoDB();

        const updateFields = {
            name, desc, price, cat, quantity
        };

        if (formData.get('image')) {
            const imgData = await formData.get('image').arrayBuffer();
            const img = Buffer.from(imgData);
            updateFields.img = img;
        }

        Object.keys(updateFields).forEach(
            (key) =>
                (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
        );

        const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });
        console.log("Product updated successfully:", updatedProduct);


    } catch (err) {
        console.error("Error updating product:", err);
        throw new Error("Failed to update product: " + err.message);
    }

    revalidatePath("/dashboard/products");

    redirect("/dashboard/products", res);
};





export const deleteUser = async (formData, res) => {


    const { id } = Object.fromEntries(formData);

    try {
        connectToMongoDB();

        // await Product.deleteOne({ _id: id });
        await User.findByIdAndDelete({ _id: id });

        console.log("User deleted successfully:");

    } catch (err) {
        console.error("Error deleted User", err);
        throw new Error("Failed to deleted User " + err.message);
    }

    revalidatePath("/dashboard/users");
};





export const deleteProduct = async (formData, res) => {


    const { id } = Object.fromEntries(formData);

    try {
        connectToMongoDB();

        // await Product.deleteOne({ _id: id });
        await Product.findByIdAndDelete({ _id: id });




        console.log("Product deleted successfully:");

    } catch (err) {
        console.error("Error deleted product:", err);
        throw new Error("Failed to deleted product: " + err.message);
    }

    revalidatePath("/dashboard/products");
};



export const authenticate = (formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        signIn("credentials", { username, password });

        return "Authentication successful";
    } catch (err) {
        console.error("Authentication error:", err);
        if (err.message.includes("CredentialsSignin")) {
            return "Wrong Credentials";
        }
        throw err;
    }
};