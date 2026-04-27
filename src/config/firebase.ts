import admin from 'firebase-admin';
import path from 'path';

// אנחנו מחשבים את הנתיב המדויק לקובץ המפתח שלנו.
// השימוש ב-path.resolve מבטיח שהנתיב יעבוד גם בפיתוח וגם כשהקוד מקומפל לתיקיית dist!
const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);

// מאתחלים את שירותי פיירבייס בשרת עם "תעודת הזהות" שהורדנו
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('🔥 Firebase Admin initialized successfully!');

export default admin;