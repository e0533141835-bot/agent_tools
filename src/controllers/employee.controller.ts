import { Request, Response } from 'express';
import { EmployeeValidator } from '../validators/employee.validator';
import { saveEmployeeAssignment } from '../services/employee.service';

export const matchRoleController = async (req: Request, res: Response) => {
    const validation = EmployeeValidator.validateMatchRole(req.body);

    if (!validation.isValid) {
        return res.status(400).json({ success: false, errors: validation.errors });
    }

    try {
        const result = await saveEmployeeAssignment(validation.sanitizedData);

        return res.status(201).json({
            success: true,
            message: "Role assigned successfully",
            id: result.insertedId
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};