import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'employee-secret-key'; // Use environment variables in production

export const registerEmployee = async (req, res) => {
    try {
        const { employeeId, fullName, email, password, position, phoneNumber } = req.body;

        // Check if employee already exists
        const existingEmployee = await Employee.findOne({ 
            $or: [{ email }, { employeeId }] 
        });
        
        if (existingEmployee) {
            return res.status(400).json({ 
                message: 'Employee already exists with this email or ID' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new employee
        const employee = new Employee({
            employeeId,
            fullName,
            email,
            password: hashedPassword,
            position,
            phoneNumber
        });

        await employee.save();

        res.status(201).json({ 
            message: 'Employee registered successfully',
            employee: {
                id: employee._id,
                employeeId: employee.employeeId,
                fullName: employee.fullName,
                email: employee.email,
                position: employee.position
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginEmployee = async (req, res) => {
    try {
        const { employeeId, password } = req.body;

        // Find employee
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(400).json({ message: 'Employee not found' });
        }

        // Check if employee is active
        if (employee.status !== 'active') {
            return res.status(403).json({ message: 'Employee account is inactive' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, employee.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate token
        const token = jwt.sign(
            { 
                employeeId: employee._id,
                position: employee.position 
            },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            token,
            employee: {
                id: employee._id,
                employeeId: employee.employeeId,
                fullName: employee.fullName,
                email: employee.email,
                position: employee.position
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};