// src/services/employee.service.ts
import { insertDocument } from '../db/roleMatcher';
import { IEmployee } from '../models/employee.model';

export const saveEmployeeAssignment = async (employeeData: IEmployee) => {
  const COLLECTION_NAME = 'employees_assignments';

  try {
    const result = await insertDocument<IEmployee>(COLLECTION_NAME, employeeData);
    return {
      success: true,
      insertedId: result.insertedId
    };
  } catch (error) {
    console.error(`[EmployeeService] Error:`, error);
    throw error;
  }
};