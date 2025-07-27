import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // make sure .env variables are available

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
