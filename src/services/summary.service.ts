import { insertDocument } from '../db/roleMatcher';
import { IManagerSummary } from '../models/summary.model';
import { sendEmail } from '../utils/email.util';

export const saveManagerSummary = async (summaryData: IManagerSummary) => {
  const COLLECTION_NAME = 'manager_summaries';

  try {
    const dbResult = await insertDocument<IManagerSummary>(COLLECTION_NAME, summaryData);

    const managerEmail = "e0533141835@gmail.com"; 

    const emailHtml = `
      <div style="direction: rtl; font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2c3e50;">סיכום הכנה ליום הראשון: ${summaryData.employee_name}</h2>
        <p>שלום רב,</p>
        <p>להלן תובנות מרכזיות משיחת ה-Onboarding שביצענו עם העובדת:</p>
        
        <h3 style="color: #27ae60;">💪 חוזקות ומוטיבציה:</h3>
        <ul>
          ${summaryData.strengths.map(s => `<li>${s}</li>`).join('')}
        </ul>

        <h3 style="color: #e67e22;">⚠️ נקודות לתשומת לב / פערים:</h3>
        <ul>
          ${summaryData.concerns_or_gaps.map(c => `<li>${c}</li>`).join('')}
        </ul>

        <div style="background-color: #f9f9f9; padding: 15px; border-right: 5px solid #3498db; margin-top: 20px;">
          <h3 style="margin-top: 0; color: #2980b9;">💡 טיפ ניהולי אופרטיבי:</h3>
          <p>${summaryData.manager_tip}</p>
        </div>
        
        <p style="font-size: 0.9em; color: #7f8c8d; margin-top: 30px;">הודעה זו נשלחה באופן אוטומטי על ידי Tali AI.</p>
      </div>
    `;

    const emailStatus = await sendEmail(
      managerEmail, 
      `סיכום מנהל: ${summaryData.employee_name} - מוכנות ליום הראשון`, 
      emailHtml
    );

    return {
      success: true,
      insertedId: dbResult.insertedId,
      emailSent: emailStatus
    };
  } catch (error) {
    console.error(`[SummaryService] Error:`, error);
    throw error;
  }
};