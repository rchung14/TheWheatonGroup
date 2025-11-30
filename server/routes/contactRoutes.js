import { Router } from 'express';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const router = Router();

router.post('/send-email', async (req, res) => {
  const { firstName, lastName, phoneNumber, message } = req.body;
  try {
    const { data, error: resendError } = await resend.emails.send({
      from: process.env.EMAIL_USER,
      to: 'ryanchung1430@gmail.com',
      subject: 'New Contact Form Submission',
      text: `Full Name: ${firstName} ${lastName}\nPhone Number: ${phoneNumber}\nMessage: ${message}`,
    });

    if (resendError) {
      console.error('Error sending email via Resend:', resendError);
      return res.status(500).send({ success: false, message: 'Error sending email.' });
    }

    console.log('Email sent via Resend:', data);
    res.status(200).send({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ success: false, message: 'Error sending email.' });
  }
});

export default router;