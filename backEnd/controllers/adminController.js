import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const LoginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username }); //cek username
        if (!admin) return res.status(400).json({ error: "User not found" });

        const match = await bcrypt.compare(password, admin.password); //cek password
        if (!match) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: admin._id }, "SECRET_KEY", { expiresIn: "1h" }); //dikasih token dan bakal expired 1 jam
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


export const verifyAdmin = async (req, res) => {
    res.json({ message: "Welcome Admin!" });
};