import { Router } from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import { validateBody, PHONE_PATTERN } from '../utils/validate.js';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
// const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'ryanchung14@gmail.com';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'will@wheaton-group.com';

const router = Router();

// Email sending is expensive and abusable — keep this much tighter than
// the global limit.
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// `website` is a honeypot: hidden from humans, filled by bots.
const CONTACT_SCHEMA = {
  firstName: { required: true, maxLength: 100 },
  lastName: { required: true, maxLength: 100 },
  phoneNumber: { required: true, maxLength: 30, pattern: PHONE_PATTERN },
  message: { required: true, maxLength: 5000 },
  website: { required: false, maxLength: 200 },
};

router.post('/send-email', emailLimiter, async (req, res) => {
  const result = validateBody(req.body, CONTACT_SCHEMA);
  if (!result.ok) {
    return res.status(400).json({ success: false, message: 'Invalid submission.' });
  }

  const { firstName, lastName, phoneNumber, message, website } = result.data;

  // Honeypot tripped — pretend success so bots don't learn to adapt.
  if (website) {
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  }

  try {
    const { error: resendError } = await resend.emails.send({
      from: process.env.EMAIL_USER,
      to: CONTACT_EMAIL,
      subject: 'New Contact Form Submission',
      text: `Full Name: ${firstName} ${lastName}\nPhone Number: ${phoneNumber}\nMessage: ${message}`,
    });

    if (resendError) {
      console.error('Error sending email via Resend:', resendError);
      return res.status(500).json({ success: false, message: 'Error sending email.' });
    }

    res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email.' });
  }
});

export default router;
