import { Router } from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { validateBody, EMAIL_PATTERN, PHONE_PATTERN } from '../utils/validate.js';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'will@wheaton-group.com';

const router = Router();

const applyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// Resumes/cover letters only — block executables and other junk.
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/rtf',
]);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 2 }, // matches the 2-file UI limit
  fileFilter: (req, file, cb) => {
    cb(null, ALLOWED_MIME_TYPES.has(file.mimetype));
  },
});

// Strip anything path-like or control-like out of client-supplied filenames.
const safeFilename = (name) =>
  String(name ?? 'attachment')
    .replace(/[^\w.\- ]/g, '_')
    .slice(0, 120) || 'attachment';

// `website` is a honeypot field; bots fill it, humans never see it.
const APPLY_SCHEMA = {
  jobId: { required: false, maxLength: 100 },
  jobTitle: { required: true, maxLength: 200 },
  company: { required: false, maxLength: 200 },
  applicantName: { required: true, maxLength: 100 },
  applicantEmail: { required: true, maxLength: 254, pattern: EMAIL_PATTERN },
  applicantPhone: { required: true, maxLength: 30, pattern: PHONE_PATTERN },
  website: { required: false, maxLength: 200 },
};

// Apply for job
router.post('/apply-job', applyLimiter, upload.array('files', 2), async (req, res) => {
  const result = validateBody(req.body, APPLY_SCHEMA);
  if (!result.ok) {
    return res.status(400).json({ success: false, message: 'Invalid submission.' });
  }

  const { jobId, jobTitle, company, applicantName, applicantEmail, applicantPhone, website } =
    result.data;

  // Honeypot tripped — pretend success so bots don't learn to adapt.
  if (website) {
    return res.status(200).json({ success: true, message: 'Application submitted successfully!' });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid submission.' });
  }

  try {
    const attachments = req.files.map((file) => ({
      filename: safeFilename(file.originalname),
      content: file.buffer.toString('base64'),
    }));

    const { error: resendError } = await resend.emails.send({
      from: process.env.EMAIL_USER,
      to: CONTACT_EMAIL,
      subject: `Job Application for ${jobTitle} at ${company}`,
      text: `Applicant Name: ${applicantName}\nApplicant Email: ${applicantEmail}\nApplicant Phone: ${applicantPhone}\nJob ID: ${jobId}\nJob Title: ${jobTitle}\nCompany: ${company}`,
      attachments,
    });

    if (resendError) {
      console.error('Error sending email via Resend:', resendError);
      return res.status(500).json({ success: false, message: 'Error submitting application' });
    }

    // Respond now; the applicant's confirmation email is best-effort and
    // shouldn't hold up the submission.
    res.status(200).json({ success: true, message: 'Application submitted successfully!' });

    resend.emails
      .send({
        from: process.env.EMAIL_USER,
        to: applicantEmail,
        subject: 'Your Application Has Been Received',
        text: `Hello ${applicantName},\n\nThank you for applying for the position of ${jobTitle}.\n\nWe have received your application and our team will review it shortly.\n\nThank you for your interest and we will be reaching out shortly.`,
      })
      .then(({ error: confirmationError }) => {
        if (confirmationError) {
          console.error('Error sending confirmation email:', confirmationError);
        }
      })
      .catch((err) => console.error('Error sending confirmation email:', err));
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error submitting application' });
  }
});

export default router;
