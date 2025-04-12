import express from 'express';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', getAllEmployees);
router.post('/create', createEmployee);
router.put('/update/:id', updateEmployee);
router.delete('/delete/:id', deleteEmployee);

export default router;