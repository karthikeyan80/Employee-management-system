import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.use('/api/employee', employeeRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
