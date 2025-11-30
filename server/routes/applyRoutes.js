import { Router } from 'express';
import multer from 'multer';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Apply for job
router.post('/apply-job', upload.array('files', 5), async (req, res) => {
  const { jobId, jobTitle, company, applicantName, applicantEmail, applicantPhone } = req.body;
  try {
    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer.toString('base64'),
    })) : [];

    const { data, error: resendError } = await resend.emails.send({
      from: process.env.EMAIL_USER,
      to: 'ryanchung1430@gmail.com',
      subject: `Job Application for ${jobTitle} at ${company}`,
      text: `Applicant Name: ${applicantName}\nApplicant Email: ${applicantEmail}\nApplicant Phone: ${applicantPhone}\nJob ID: ${jobId}\nJob Title: ${jobTitle}\nCompany: ${company}`,
      attachments,
    });

    if (resendError) {
      console.error('Error sending email via Resend:', resendError);
      return res.status(500).json({ success: false, message: 'Error submitting application' });
    }

    console.log('Email sent via Resend:', data);
    res.status(200).json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error submitting application" });
  }
});

export default router;