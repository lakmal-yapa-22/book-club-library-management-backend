import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendOverdueEmail = async (req: Request, res: Response) => {
    const { to, readerName, books } = req.body;

    if (!to || !readerName || !Array.isArray(books) || books.length === 0) {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    const bookList = books
        .map((book: { title: string; dueDate: string }, i: number) =>
            `${i + 1}. ${book.title} (Due: ${book.dueDate})`
        )
        .join('\n');

    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject: '📚 Overdue Book Reminder',
        text: `Dear ${readerName},\n\nThe following books are overdue:\n\n${bookList}\n\nPlease return them as soon as possible.\n\nThank you,\nLibrary Team`,
    };

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Reminder email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};
