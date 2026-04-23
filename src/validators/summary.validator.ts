import { IManagerSummary } from '../models/summary.model';

export class SummaryValidator {
  static validate(data: any) {
    const errors: string[] = [];
    
    // 1. הגדרת שדות חובה (מבוסס על ה-Interface)
    const requiredFields: (keyof IManagerSummary)[] = [
      'employee_name', 
      'strengths', 
      'concerns_or_gaps', 
      'manager_tip'
    ];

    // 2. בדיקת קיום שדות בסיסית
    requiredFields.forEach(field => {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push(`The field '${field}' is mandatory.`);
      }
    });

    const validateArray = (arr: any, fieldName: string) => {
      if (arr) {
        if (!Array.isArray(arr)) {
          errors.push(`${fieldName} must be an array of strings.`);
        } else {
          if (arr.length === 0) {
            errors.push(`At least one ${fieldName.toLowerCase()} is required.`);
          }
          const hasInvalidItems = arr.some(item => typeof item !== 'string' || item.trim().length === 0);
          if (hasInvalidItems) {
            errors.push(`All items in ${fieldName} must be valid non-empty strings.`);
          }
        }
      }
    };

    validateArray(data.strengths, 'Strengths');
    validateArray(data.concerns_or_gaps, 'Concerns_or_gaps');

    if (data.manager_tip && typeof data.manager_tip === 'string') {
      const tipLength = data.manager_tip.trim().length;
      if (tipLength < 10) {
        errors.push("Manager tip is too vague. Please provide a more detailed insight (min 10 chars).");
      }
      if (tipLength > 600) {
        errors.push("Manager tip is too long. Please keep it concise (max 600 chars).");
      }
    }

    let sanitizedData: IManagerSummary | null = null;

    if (errors.length === 0) {
      sanitizedData = {
        employee_name: String(data.employee_name).trim(),
        strengths: data.strengths.map((s: string) => s.trim()),
        concerns_or_gaps: data.concerns_or_gaps.map((c: string) => c.trim()),
        manager_tip: data.manager_tip.trim()
      };
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData
    };
  }
}