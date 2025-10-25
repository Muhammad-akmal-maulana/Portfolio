import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import connectDB from './config/connectDB.js';
import adminRoutes from './routes/adminRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import aboutmeRoutes from './routes/aboutmeRoutes.js';

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json()); // untuk parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // inputan gambar bakal ke folder uploads

//routes
app.use('/api/admin', adminRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/aboutme', aboutmeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Berjalan di http://localhost:${port}`)
});