import { Router } from 'express';
import multer from 'multer';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 5 }, // 10MB per file
});

// Apply for job
router.post('/apply-job', upload.array('files', 5), async (req, res) => {
  const { jobId, jobTitle, company, applicantName, applicantEmail, applicantPhone } = req.body;

  if (!applicantName || !applicantEmail || !applicantPhone || !jobTitle) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer.toString('base64'),
    })) : [];

    const { data, error: resendError } = await resend.emails.send({
      from: process.env.EMAIL_USER,
      to: 'will@wheaton-group.com',
      // to: 'ryanchung1430@gmail.com',
      subject: `Job Application for ${jobTitle} at ${company}`,
      text: `Applicant Name: ${applicantName}\nApplicant Email: ${applicantEmail}\nApplicant Phone: ${applicantPhone}\nJob ID: ${jobId}\nJob Title: ${jobTitle}\nCompany: ${company}`,
      attachments,
    });

    if (resendError) {
      console.error('Error sending email via Resend:', resendError);
      return res.status(500).json({ success: false, message: 'Error submitting application' });
    }

    console.log('Email sent via Resend:', data);

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
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error submitting application" });
  }
});

export default router;