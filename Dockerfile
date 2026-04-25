# 1. מתחילים ממחשב וירטואלי נקי עם Node.js
FROM node:20-alpine

# 2. מגדירים את תיקיית העבודה
WORKDIR /app

# 3. מעתיקים את קבצי ההגדרות
COPY package*.json ./

# 4. מתקינים את כל הספריות (כולל ספריות הפיתוח שצריך כדי לקמפל)
RUN npm install

# 5. מעתיקים פנימה את כל שאר הקוד
COPY . .

# 6. ממירים את קוד ה-TypeScript ל-JavaScript מוכן לשרת
RUN npm run build

# 7. פקודת ההפעלה הסופית של השרת בענן (משתמשת ב-npm start)
CMD ["npm", "start"]