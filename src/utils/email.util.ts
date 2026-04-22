import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, htmlContent: string): Promise<boolean> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Tali AI - Loop Closer" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: htmlContent
        };

        console.log(`[EmailUtil] Attempting to send email to ${to}...`);
        const info = await transporter.sendMail(mailOptions);

        console.log(`[EmailUtil] Email sent successfully: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('[EmailUtil] Error sending email:', error);
        return false;
    }
};