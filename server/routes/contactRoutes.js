import { Router } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/send-email', async (req, res) => {
  const { firstName, lastName, phoneNumber, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      // to: 'will@wheaton-group.com',
      to: 'ryanchung14@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Full Name: ${firstName} ${lastName}\nPhone Number: ${phoneNumber}\nMessage: ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ success: false, message: 'Error sending email.' });
  }
});

export default router;