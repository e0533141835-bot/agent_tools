// src/validators/employee.validator.ts
import { IEmployee } from '../models/employee.model';

export class EmployeeValidator {
  static validateMatchRole(data: any) {
    const errors: string[] = [];
    
    // הגדרת השדות לפי המודל
    const requiredFields: (keyof IEmployee)[] = ['name', 'phone', 'assignedRole'];

    // בדיקת קיום שדות חובה
    requiredFields.forEach(field => {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    });

    // בדיקת תוכן
    if (data.name && (typeof data.name !== 'string' || data.name.length < 2)) {
      errors.push("Name must be at least 2 characters.");
    }

    const phoneRegex = /^[0-9]{9,10}$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
      errors.push("Invalid phone format (9-10 digits).");
    }

    // ניקוי שדות עודפים שלא מופיעים במודל
    const allowedFields: string[] = requiredFields;
    Object.keys(data).forEach(key => {
      if (!allowedFields.includes(key)) {
        delete data[key]; 
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: data as IEmployee
    };
  }
}