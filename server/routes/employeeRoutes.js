import express from 'express';
import { getAllEmployees, createEmployee, updateEmployee, getEmployee, deleteEmployee } from "../controllers/employeeController.js";

import upload from '../middleware/imageUpload.js';

const router = express.Router();

router.get('/', getAllEmployees);
router.post('/', upload.single('image'), createEmployee);
router.patch('/:id', upload.single('image'), updateEmployee);
router.get('/:id', getEmployee);
router.delete('/:id', deleteEmployee);

export default router;
