export interface IManagerSummary {
  employee_name: string;      // שם העובדת
  strengths: string[];         // רשימת חוזקות (מערך של מחרוזות)
  concerns_or_gaps: string[];  // רשימת חששות או פערי ידע
  manager_tip: string;         // שורת המחץ האופרטיבית למנהל
  createdAt?: Date;            // תאריך יצירה (אופציונלי, מתווסף ב-DB)
}